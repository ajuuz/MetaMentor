import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { INotificationRepository } from "domain/repositoryInterfaces/notificationRepository.interface";
import { IRescheduleReviewRepository } from "domain/repositoryInterfaces/rescheduleReviewRepository.interface";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { IPushNotificationService } from "application/interfaces/service/pushNotificationService.interface";
import { IRescheduleReviewSubmitByMentor } from "application/usecase/interfaces/review/rescheduleReviewSubmitByMentorUsecase.interface";
import { ICreateTransactionUsecase } from "application/usecase/interfaces/transaction/createTransactionUsecase.interface";
import { ICreditWalletUsecase } from "application/usecase/interfaces/wallet/creditWalletUsecase.inteface";
import { IDebitWalletUsecase } from "application/usecase/interfaces/wallet/debitWalletUsecase.interface";
import { config } from "shared/config";
import {
  ERROR_MESSAGE,
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

@injectable()
export class RescheduleReviewSubmitByMentor
  implements IRescheduleReviewSubmitByMentor
{
  private _adminId: string;
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,

    @inject("IPushNotificationService")
    private _pushNotificationService: IPushNotificationService,

    @inject("ICreateTransactionUsecase")
    private _createTransactionUsecase: ICreateTransactionUsecase,

    @inject("ICreditWalletUsecase")
    private _creditWalletUsecase: ICreditWalletUsecase,

    @inject("IDebitWalletUsecase")
    private _debitWalletUsecase: IDebitWalletUsecase,

    @inject("IRescheduleReviewRepository")
    private _rescheduleReviewRepository: IRescheduleReviewRepository,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {
    this._adminId = config.ADMIN_ID!;
  }

  async execute(reviewId: string, status: "accept" | "cancel"): Promise<void> {
    const fetchFilter = { _id: reviewId, status: REVIEW_STATUS.RESCHEDULED };
    const review = await this._reviewRepository.findOne(fetchFilter);
    if (!review) {
      throw new NotFoundError();
    }

    const asyncOperations = [];

    if (status === "cancel") {
      const currentDate = new Date();
      const slotStartTime = new Date(review.slot.start);

      const diffInMs = slotStartTime.getTime() - currentDate.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      if (diffInDays < 2) {
        throw new CustomError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_MESSAGE.REVIEW.CANCEL_ERROR
        );
      }

      const filter = { reviewId };
      const update = { status: REVIEW_STATUS.CANCELLED };
      const cancelledReview = await this._reviewRepository.updateReview(
        filter,
        update
      );
      if (!cancelledReview) {
        throw new NotFoundError();
      }
      const studentId = cancelledReview.studentId.toString();
      asyncOperations.push(
        this._pushNotificationService.sendNotification(
          studentId,
          NOTIFICATION_TITLE.REVIEW_CANCEL,
          NOTIFICATION_MESSAGE.REVIEW_CANCEL_MENTOR
        )
      );

      const notification: Partial<INotificationEntity> = {
        userId: studentId,
        type: NOTIFICATION_TYPE.SLOT_CANCEL,
        title: NOTIFICATION_TITLE.REVIEW_CANCEL,
        body: NOTIFICATION_MESSAGE.REVIEW_CANCEL_MENTOR,
        navigate: null,
        isRead: false,
      };
      asyncOperations.push(
        this._notificationRepository.insertOne(notification)
      );

      const transactionAmount =
        cancelledReview.mentorEarning + cancelledReview.commissionAmount;
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
    } else {
      const rescheduledReview = await this._rescheduleReviewRepository.findOne({
        reviewId,
      });
      if (!rescheduledReview) throw new NotFoundError();

      const slot = rescheduledReview.slot;

      asyncOperations.push(
        this._reviewRepository.updateReviewSlot(reviewId, slot)
      );

      const studentId = review.studentId.toString();
      asyncOperations.push(
        this._pushNotificationService.sendNotification(
          studentId,
          NOTIFICATION_TITLE.REVIEW_RESCHEDULE_ACCEPTED,
          NOTIFICATION_MESSAGE.REVIEW_RESCHEDULE_ACCEPTED
        )
      );

      const notification: Partial<INotificationEntity> = {
        userId: studentId,
        type: NOTIFICATION_TYPE.SLOT_CANCEL,
        title: NOTIFICATION_TITLE.REVIEW_CANCEL,
        body: NOTIFICATION_MESSAGE.REVIEW_CANCEL_MENTOR,
        navigate: "/reviews?tab=rescheduled",
        isRead: false,
      };
      asyncOperations.push(
        this._notificationRepository.insertOne(notification)
      );
    }

    await Promise.all(asyncOperations);
  }
}
