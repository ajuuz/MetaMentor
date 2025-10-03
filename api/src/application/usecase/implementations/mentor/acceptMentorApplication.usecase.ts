import { IMentorEntity } from "domain/entities/mentor-model.entity";
import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { CustomError } from "domain/errors/customError";
import { ValidationError } from "domain/errors/validationError";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { INotificationRepository } from "domain/repositoryInterfaces/notificationRepository.interface";
import { ISequenceNumberRepository } from "domain/repositoryInterfaces/sequenceNumberRepository.interface";
import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";

import { IAcceptMentorApplicationUsecase } from "application/usecase/interfaces/mentor/acceptMentorApplicationUsecase.interface";
import {
  EVENT_EMITTER_TYPE,
  HTTP_STATUS,
  MAIL_CONTENT_PURPOSE,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
  ROLES,
} from "shared/constants";
import { mailContentProvider } from "shared/contentProviders/mailContentProvider";
import { eventBus } from "shared/eventBus";
import { inject, injectable } from "tsyringe";


@injectable()
export class AcceptMentorApplicationUsecase
  implements IAcceptMentorApplicationUsecase
{
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository,

    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("ISlotRepository")
    private _slotRepository: ISlotRepository,

    @inject("ISequenceNumberRepository")
    private _sequenceNumberRepository: ISequenceNumberRepository,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository
  ) {}

  async execute(mentorId: string, email: string): Promise<void> {
    if (!mentorId) throw new ValidationError("mentor Id is required");

    const asyncOperations = [];
    const userFilter = { _id: mentorId };
    const userUpdate = { role: ROLES.MENTOR };

    asyncOperations.push(
      this._userRepository.updateOne(userFilter, userUpdate)
    );

    const mentorFilter: {
      field: keyof IMentorEntity;
      value: string | boolean | number;
    }[] = [];
    mentorFilter.push({ field: "userId", value: mentorId });
    const seq = await this._sequenceNumberRepository.findAndUpdate("mentorSeq");
    if (!seq)
      throw new CustomError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Cannot assign sequence number"
      );
    const mentorUpdate = { isVerified: true, seq };

    asyncOperations.push(
      this._mentorRepository.updateOne(mentorFilter, mentorUpdate)
    );

    asyncOperations.push(this._slotRepository.createSlots(mentorId));

    const notification: Partial<INotificationEntity> = {
      userId: mentorId,
      type: NOTIFICATION_TYPE.MENTOR_ACCEPTANCE,
      title: NOTIFICATION_TITLE.MENTOR_ACCEPTANCE,
      body: NOTIFICATION_MESSAGE.MENTOR_ACCEPTANCE,
      navigate: null,
      isRead: false,
    };
    asyncOperations.push(this._notificationRepository.insertOne(notification));

    await Promise.all(asyncOperations);

    const html = mailContentProvider(MAIL_CONTENT_PURPOSE.MENTOR_ACCEPTANCE);
    eventBus.emit(
      EVENT_EMITTER_TYPE.SEND_MAIL,
      email,
      "Accepted Application",
      html
    );

    eventBus.emit(
      EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
      mentorId,
      NOTIFICATION_TITLE.MENTOR_ACCEPTANCE,
      NOTIFICATION_MESSAGE.MENTOR_ACCEPTANCE
    );
  }
}
