import crypto from "crypto";
import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { ITransactionEntity } from "domain/entities/transactionModel.entity";
import { CustomError } from "domain/errors/customError";
import { INotificationRepository } from "domain/repositoryInterfaces/notificationRepository.interface";

import { VerifyPaymentReqDTO } from "application/dto/requset/payment.dto";
import { IVerifyPaymentUsecase } from "application/usecase/interfaces/payment/verifyPaymentUsecase.interface";
import { IBookReviewUsecase } from "application/usecase/interfaces/review/bookReviewUsecase.interface";
import { ICreateTransactionUsecase } from "application/usecase/interfaces/transaction/createTransactionUsecase.interface";
import { ICreditWalletUsecase } from "application/usecase/interfaces/wallet/creditWalletUsecase.inteface";
import { config } from "shared/config";
import {
  EVENT_EMITTER_TYPE,
  HTTP_STATUS,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
  TRANSACTION_TYPE,
} from "shared/constants";
import { eventBus } from "shared/eventBus";
import { inject, injectable } from "tsyringe";


@injectable()
export class VerifyPaymentUsecase implements IVerifyPaymentUsecase {
  private _adminId: string;
  constructor(
    @inject("IBookReviewUsecase")
    private _bookReviewUsecase: IBookReviewUsecase,

    @inject("ICreateTransactionUsecase")
    private _createTransactionUsecase: ICreateTransactionUsecase,

    @inject("ICreditWalletUsecase")
    private _creditWalletUsecase: ICreditWalletUsecase,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {
    this._adminId = config.ADMIN_ID!;
  }
  async execute(
    studentId: string,
    paymentAndReviewDetails: VerifyPaymentReqDTO
  ): Promise<void> {
    const { razorPayDetails, reviewDetails } = paymentAndReviewDetails;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      razorPayDetails;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", config.RAZORPAY.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature !== expectedSign) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        "Invalid payment signature"
      );
    }

    const reviewId = await this._bookReviewUsecase.create(
      studentId,
      reviewDetails
    );
    const asyncOperations = [];

    const adminTransaction: Omit<ITransactionEntity, "_id" | "createdAt"> = {
      walletId: this._adminId,
      reviewId,
      type: TRANSACTION_TYPE.CREDIT,
      amount: reviewDetails.amount,
      description: `Amount ${reviewDetails.amount} has been credited for review booked by ${studentId}`,
    };
    const studentTransaction: Omit<ITransactionEntity, "_id" | "createdAt"> = {
      walletId: studentId,
      reviewId,
      type: TRANSACTION_TYPE.DEBIT,
      amount: reviewDetails.amount,
      description: `Amount ${reviewDetails.amount} has been debited for review booked by ${studentId}`,
    };

    asyncOperations.push(
      this._createTransactionUsecase.execute(adminTransaction)
    );
    asyncOperations.push(
      this._createTransactionUsecase.execute(studentTransaction)
    );
    asyncOperations.push(
      this._creditWalletUsecase.execute(this._adminId, reviewDetails.amount)
    );

    const notification: Partial<INotificationEntity> = {
      userId: reviewDetails.mentorId,
      type: NOTIFICATION_TYPE.SLOT_BOOKING,
      title: NOTIFICATION_TITLE.REVIEW_BOOKED,
      body: NOTIFICATION_MESSAGE.REVIEW_BOOKED,
      navigate: "/mentor/reviews?tab=pending&pendingReviewState=notOver",
      isRead: false,
    };
    asyncOperations.push(this._notificationRepository.insertOne(notification));
    await Promise.all(asyncOperations);

    eventBus.emit(
      EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
      reviewDetails.mentorId,
      NOTIFICATION_TITLE.REVIEW_BOOKED,
      NOTIFICATION_MESSAGE.REVIEW_BOOKED
    );
  }
}
