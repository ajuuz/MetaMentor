import { Worker } from "bullmq";
import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { bullRedisConfig } from "infrastructure/config/bullRedis/bullRedis.config";
import { NotificationRepository } from "infrastructure/repository/notification.repository";
import { ReviewRepository } from "infrastructure/repository/review.repository";
import { TransactionRepository } from "infrastructure/repository/transaction.repository";
import { WalletRepository } from "infrastructure/repository/wallet.repository";
import {
  EVENT_EMITTER_TYPE,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
  TRANSACTION_TYPE,
} from "shared/constants";
import { eventBus } from "shared/eventBus";

console.log("payment worker initialized");
const walletRepository = new WalletRepository();
const reviewRepository = new ReviewRepository();
const transactionRepository = new TransactionRepository();
const notificationRepository = new NotificationRepository();
const adminWalletId = process.env.ADMIN_OBJECT_ID;

export const paymentWorker = new Worker(
  "paymentQueue",
  async (job) => {
    const { reviewId, mentorId } = job.data;
    console.log("processing payment", job.data);
    const asyncOperations = [];

    try {
      const review = await reviewRepository.findOne({
        _id: reviewId,
        mentorId,
      });
      if (!review) return;
      const mentorEarning = review.mentorEarning;

      const adminTransaction = {
        walletId: adminWalletId!,
        reviewId,
        type: TRANSACTION_TYPE.DEBIT,
        amount: mentorEarning,
        description: `Amount ${mentorEarning} has been debited for review completion by mentor`,
      };

      const mentorTransaction = {
        walletId: mentorId,
        reviewId,
        type: TRANSACTION_TYPE.CREDIT,
        amount: mentorEarning,
        description: `Amount ${mentorEarning} has been credited for review completion by mentor`,
      };

      asyncOperations.push(
        walletRepository.creditAmount(mentorId, mentorEarning)
      );
      asyncOperations.push(
        walletRepository.debitAmount(adminWalletId!, mentorEarning)
      );

      asyncOperations.push(
        transactionRepository.createTransaction(adminTransaction)
      );
      asyncOperations.push(
        transactionRepository.createTransaction(mentorTransaction)
      );

      await Promise.all(asyncOperations);

      try {
        //===========push notification==========//
        console.log("mentorId", mentorId);
        eventBus.emit(
          EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
          mentorId,
          NOTIFICATION_TITLE.MENTOR_EARNINGS_CREDITED,
          NOTIFICATION_MESSAGE.MENTOR_EARNINGS_CREDITED
        );
      } catch (err) {
        console.error("❌ Failed to send push notification:", err);
      }

      try {
        //===========save notification==========//
        const mentorNotification: Partial<INotificationEntity> = {
          userId: mentorId,
          type: NOTIFICATION_TYPE.MENTOR_EARNINGS_CREDITED,
          title: NOTIFICATION_TITLE.MENTOR_EARNINGS_CREDITED,
          body: NOTIFICATION_MESSAGE.MENTOR_EARNINGS_CREDITED,
          navigate: "/mentor/wallet",
          isRead: false,
        };
        await notificationRepository.insertOne(mentorNotification);
      } catch (err) {
        console.error("❌ Failed to save notification:", err);
      }
    } catch (err) {
      console.error(`❌ Unexpected error in job ${job.id}:`, err);
      throw err;
    }
  },
  { connection: bullRedisConfig, concurrency: 5 }
);

paymentWorker.on("completed", (job) => {
  console.log(`payment Job ${job.id} completed`);
});

paymentWorker.on("failed", (job, err) => {
  console.error(`payment Job ${job?.id} failed:`, err);
});
