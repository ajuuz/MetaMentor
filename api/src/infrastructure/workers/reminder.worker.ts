import { Worker } from "bullmq";
import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { bullRedisConfig } from "infrastructure/config/bullRedis/bullRedis.config";
import { NotificationRepository } from "infrastructure/repository/notification.repository";
import {
  EVENT_EMITTER_TYPE,
  MAIL_CONTENT_PURPOSE,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
  ROLES,
} from "shared/constants";
import { mailContentProvider } from "shared/contentProviders/mailContentProvider";
import { eventBus } from "shared/eventBus";

console.log("reminder worker initialized");
const notificationRepository = new NotificationRepository();
export const reminderWorker = new Worker(
  "reminderQueue",
  async (job) => {
    const {
      mentorId,
      mentorName,
      mentorEmail,
      studentId,
      studentName,
      studentEmail,
      domainName,
      levelName,
    } = job.data;

    try {
      const htmlContentForStudent = mailContentProvider(
        MAIL_CONTENT_PURPOSE.REVIEW_REMINDER,
        {
          for: ROLES.USER,
          myName: studentName,
          otherAttendee: mentorName,
          domainName,
          levelName,
        }
      );

      const htmlContentForMentor = mailContentProvider(
        MAIL_CONTENT_PURPOSE.REVIEW_REMINDER,
        {
          for: ROLES.MENTOR,
          myName: mentorName,
          otherAttendee: studentName,
          domainName,
          levelName,
        }
      );

      try {
        //=======email notification =============///////
        //---student----//
        eventBus.emit(
          EVENT_EMITTER_TYPE.SEND_MAIL,
          studentEmail,
          "review reminder",
          htmlContentForStudent
        );

        //---mentor----//
        eventBus.emit(
          EVENT_EMITTER_TYPE.SEND_MAIL,
          mentorEmail,
          "review reminder",
          htmlContentForMentor
        );
      } catch (err) {
        console.error("❌ Failed to send email:", err);
      }

      try {
        //=======push notification =============///////
        //---student----//
        eventBus.emit(
          EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
          studentId,
          NOTIFICATION_TITLE.REVIEW_REMINDER,
          NOTIFICATION_MESSAGE.REVIEW_REMINDER
        );

        //---mentor----//
        eventBus.emit(
          EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
          mentorId,
          NOTIFICATION_TITLE.REVIEW_REMINDER,
          NOTIFICATION_MESSAGE.REVIEW_REMINDER
        );
      } catch (err) {
        console.error("❌ Failed to send push notification:", err);
      }

      try {
        const asyncOperations = [];
        ///========save notification==========//
        ////-----student-------//
        const studentNotification: Partial<INotificationEntity> = {
          userId: studentId,
          type: NOTIFICATION_TYPE.REVIEW_REMINDER,
          title: NOTIFICATION_TITLE.REVIEW_REMINDER,
          body: NOTIFICATION_MESSAGE.REVIEW_REMINDER,
          navigate: "/reviews?tab=pending",
          isRead: false,
        };
        asyncOperations.push(
          notificationRepository.insertOne(studentNotification)
        );

        ////-----mentor-------//
        const mentorNotification: Partial<INotificationEntity> = {
          userId: mentorId,
          type: NOTIFICATION_TYPE.REVIEW_REMINDER,
          title: NOTIFICATION_TITLE.REVIEW_REMINDER,
          body: NOTIFICATION_MESSAGE.REVIEW_REMINDER,
          navigate: "/mentor/reviews?tab=pending",
          isRead: false,
        };
        asyncOperations.push(
          notificationRepository.insertOne(mentorNotification)
        );

        await Promise.all(asyncOperations);
        
      } catch (err) {
        console.error("❌ Failed to save notification:", err);
      }
    } catch (err) {
      console.error(`❌ Unexpected error in job ${job.id}:`, err);
      throw err;
    }
  },
  {
    connection: bullRedisConfig,
    concurrency: 5, // process 5 reminders in parallel
  }
);

reminderWorker.on("completed", (job) => {
  console.log(`✅ Reminder job ${job.id} completed`);
});

reminderWorker.on("failed", (job, err) => {
  console.error(`❌ Reminder job ${job?.id} failed:`, err);
});
