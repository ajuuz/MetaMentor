import { IMentorEntity } from "domain/entities/mentor-model.entity";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { IRejectMentorApplicationUsecase } from "application/usecase/interfaces/mentor/rejectMentorApplication.interface";
import {
  EVENT_EMITTER_TYPE,
  MAIL_CONTENT_PURPOSE,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
} from "shared/constants";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/contentProviders/mailContentProvider";
import { inject, injectable } from "tsyringe";
import { INotificationRepository } from "domain/repositoryInterfaces/notificationRepository.interface";
import { INotificationEntity } from "domain/entities/notificationModel.entity";

@injectable()
export class RejectMentorApplicationUsecase
  implements IRejectMentorApplicationUsecase
{
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {}
  async execute(
    mentorId: string,
    email: string,
    reason: string
  ): Promise<void> {
    const filter: {
      field: keyof IMentorEntity;
      value: string | boolean | number;
    }[] = [];
    filter.push({ field: "userId", value: mentorId });
    const update: Pick<IMentorEntity, "isRejected"> = { isRejected: true };

    const asyncOperations = [];
    asyncOperations.push(this._mentorRepository.updateOne(filter, update));

    const notification: Partial<INotificationEntity> = {
      userId: mentorId,
      type: NOTIFICATION_TYPE.MENTOR_REJECTION,
      title: NOTIFICATION_TITLE.MENTOR_REJECTION,
      body: NOTIFICATION_MESSAGE.MENTOR_REJECTION,
      navigate: null,
      isRead: false,
    };
    asyncOperations.push(this._notificationRepository.insertOne(notification));
    await Promise.all(asyncOperations);
    const html = mailContentProvider(
      MAIL_CONTENT_PURPOSE.MENTOR_REJECTION,
      reason
    );

    eventBus.emit(
      EVENT_EMITTER_TYPE.SEND_MAIL,
      email,
      "Application Rejected",
      html
    );
  }
}
