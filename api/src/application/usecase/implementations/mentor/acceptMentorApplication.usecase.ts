import { IMentorEntity } from "domain/entities/mentor-model.entity";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { ISequenceNumberRepository } from "domain/repositoryInterfaces/sequenceNumberRepository.interface";
import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IPushNotificationService } from "entities/serviceInterfaces/pushNotificationService.interface";
import { IAcceptMentorApplicationUsecase } from "application/usecase/interfaces/mentor/acceptMentorApplicationUsecase.interface";
import { ICreateNotificationUsecase } from "application/usecase/interfaces/notification/createNotificationUsecase.interface";
import {
  EVENT_EMITTER_TYPE,
  HTTP_STATUS,
  MAIL_CONTENT_PURPOSE,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  ROLES,
} from "shared/constants";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/mailContentProvider";
import { CustomError } from "domain/errors/customError";
import { ValidationError } from "domain/errors/validationError";
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

    @inject("ICreateNotificationUsecase")
    private _createNotificationUsecase: ICreateNotificationUsecase,

    @inject("ISequenceNumberRepository")
    private _sequenceNumberRepository: ISequenceNumberRepository,

    @inject("IPushNotificationService")
    private _pushNotificationService: IPushNotificationService
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
    asyncOperations.push(
      this._pushNotificationService.sendNotification(
        mentorId,
        NOTIFICATION_TITLE.MENTOR_ACCEPTANCE,
        NOTIFICATION_MESSAGE.MENTOR_ACCEPTANCE
      )
    );
    await Promise.all(asyncOperations);

    const html = mailContentProvider(MAIL_CONTENT_PURPOSE.MENTOR_ACCEPTANCE);
    eventBus.emit(
      EVENT_EMITTER_TYPE.SENDMAIL,
      email,
      "Accepted Application",
      html
    );
  }
}
