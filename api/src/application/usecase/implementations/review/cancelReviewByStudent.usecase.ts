import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { IPushNotificationService } from "application/interfaces/service/pushNotificationService.interface";
import { ICancelReviewByStudentUsecase } from "application/usecase/interfaces/review/cancelReviewByStudentUsecase.interface";
import { ICreateTransactionUsecase } from "application/usecase/interfaces/transaction/createTransactionUsecase.interface";
import { ICreditWalletUsecase } from "application/usecase/interfaces/wallet/creditWalletUsecase.inteface";
import { IDebitWalletUsecase } from "application/usecase/interfaces/wallet/debitWalletUsecase.interface";
import { config } from "shared/config";
import {
  ERROR_MESSAGE,
  EVENT_EMITTER_TYPE,
  HTTP_STATUS,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
  REVIEW_STATUS,
  TRANSACTION_TYPE,
} from "shared/constants";
import { CustomError } from "domain/errors/customError";
import { NotFoundError } from "domain/errors/notFounError";
import { inject, injectable } from "tsyringe";
import { eventBus } from "shared/eventBus";
import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { INotificationRepository } from "domain/repositoryInterfaces/notificationRepository.interface";

@injectable()
export class CancelReviewByStudentUsecase
  implements ICancelReviewByStudentUsecase
{
  private _adminId: string;
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,

    @inject("ICreateTransactionUsecase")
    private _createTransactionUsecase: ICreateTransactionUsecase,

    @inject("ICreditWalletUsecase")
    private _creditWalletUsecase: ICreditWalletUsecase,

    @inject("IDebitWalletUsecase")
    private _debitWalletUsecase: IDebitWalletUsecase,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {
    this._adminId = config.ADMIN_ID!;
  }

  async execute(studentId: string, reviewId: string): Promise<void> {
    const fetchFilter = { _id: reviewId, status: REVIEW_STATUS.PENDING };
    const review = await this._reviewRepository.findOne(fetchFilter);
    if (!review) {
      throw new NotFoundError();
    }

    const currentDate = new Date();
    const slotStartTime = new Date(review.slot.start);

    const diffInMs = slotStartTime.getTime() - currentDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 2) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGE.REVIEW.CANCEL_ERROR
      );
    }

    const filter = { studentId, reviewId };
    const update = { status: REVIEW_STATUS.CANCELLED };
    const cancelledReview = await this._reviewRepository.updateReview(
      filter,
      update
    );
    if (!cancelledReview) {
      throw new NotFoundError();
    }
    const mentorId = cancelledReview.mentorId.toString();
    const asyncOperations = [];

    const transactionAmount = cancelledReview.mentorEarning;
    const adminTransaction = {
      walletId: this._adminId,
      reviewId: cancelledReview._id.toString(),
      type: TRANSACTION_TYPE.DEBIT,
      amount: transactionAmount,
      description: `Amount ${transactionAmount} has been debited for review cancellation by mentor`,
    };

    const studentTransaction = {
      walletId: cancelledReview.studentId.toString(),
      reviewId: cancelledReview._id.toString(),
      type: TRANSACTION_TYPE.CREDIT,
      amount: transactionAmount,
      description: `Amount ${transactionAmount} has been credited for review cancellation by mentor`,
    };
    asyncOperations.push(
      this._createTransactionUsecase.execute(adminTransaction)
    );
    asyncOperations.push(
      this._createTransactionUsecase.execute(studentTransaction)
    );
    asyncOperations.push(
      this._creditWalletUsecase.execute(
        cancelledReview.studentId.toString(),
        transactionAmount
      )
    );
    asyncOperations.push(
      this._debitWalletUsecase.execute(this._adminId, transactionAmount)
    );

    const notification: Partial<INotificationEntity> = {
      userId: mentorId,
      type: NOTIFICATION_TYPE.SLOT_CANCEL,
      title: NOTIFICATION_TITLE.REVIEW_CANCEL,
      body: NOTIFICATION_MESSAGE.REVIEW_CANCEL_STUDENT,
      navigate: "/mentor/reviews?tab=cancelled",
      isRead: false,
    };
    asyncOperations.push(this._notificationRepository.insertOne(notification));
    await Promise.all(asyncOperations);

    eventBus.emit(
      EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
      mentorId,
      NOTIFICATION_TITLE.REVIEW_CANCEL,
      NOTIFICATION_MESSAGE.REVIEW_CANCEL_STUDENT
    );
  }
}
