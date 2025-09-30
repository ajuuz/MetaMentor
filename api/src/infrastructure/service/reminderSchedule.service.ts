import { IReminderScheduleService } from "application/interfaces/service/reminderScheduleService.interface";
import { ICreateReviewPoplutedEntity } from "domain/entities/reviewModel.entity";
import { reminderQueue } from "infrastructure/queues/reminder.queue";
import { injectable } from "tsyringe";

@injectable()
export class ReminderScheduleService implements IReminderScheduleService {
  async scheduleReminder(bookedReviewDetails: ICreateReviewPoplutedEntity) {
    const {
      _id: reviewId,
      student,
      mentor,
      domainName,
      levelName,
      slot,
    } = bookedReviewDetails;
    const mentorId = mentor._id;
    const mentorName = mentor.name;
    const mentorEmail = mentor.email;
    const studentId = student._id;
    const studentName = student.name;
    const studentEmail = student.email;
    const reviewStart = slot.start;
    const remindAt = new Date(reviewStart.getTime() - 30 * 60 * 1000);

    await reminderQueue.add(
      "sendReminder",
      {
        reviewId,
        mentorId,
        mentorName,
        mentorEmail,
        studentId,
        studentName,
        studentEmail,
        domainName,
        levelName,
      },
      {
        delay: remindAt.getTime() - Date.now(),
        attempts: 2,
      }
    );
    console.log(`Reminder scheduled for session ${reviewId} at ${remindAt}`);
  }
}
