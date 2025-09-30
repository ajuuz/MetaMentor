import { ICreateReviewPoplutedEntity } from "domain/entities/reviewModel.entity";

export interface IReminderScheduleService {
  scheduleReminder(
    bookedReviewDetails: ICreateReviewPoplutedEntity
  ): Promise<void>;
}
