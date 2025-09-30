import { INotificationEntity } from "domain/entities/notificationModel.entity";
import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";
import { INotificationRepository } from "domain/repositoryInterfaces/notificationRepository.interface";
import { IRescheduleReviewRepository } from "domain/repositoryInterfaces/rescheduleReviewRepository.interface";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { IPushNotificationService } from "application/interfaces/service/pushNotificationService.interface";
import { IRescheduleReviewByStudentUsecase } from "application/usecase/interfaces/review/rescheduleReviewByStudentUsecase.interface";
import {
  ERROR_MESSAGE,
  EVENT_EMITTER_TYPE,
  HTTP_STATUS,
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
  NOTIFICATION_TYPE,
  REVIEW_STATUS,
  ROLES,
  TRANSACTION_TYPE,
} from "shared/constants";
import { RescheduleReviewByStudReqDTO } from "application/dto/requset/review.dto";
import { CustomError } from "domain/errors/customError";
import { NotFoundError } from "domain/errors/notFounError";
import { inject, injectable } from "tsyringe";
import { eventBus } from "shared/eventBus";

@injectable()
export class RescheduleReviewByStudentUsecase
  implements IRescheduleReviewByStudentUsecase
{
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,

    @inject("IRescheduleReviewRepository")
    private _rescheduleReviewRepository: IRescheduleReviewRepository,

    @inject("INotificationRepository")
    private _notificationRepository: INotificationRepository,

    
  ) {}

  async execute(
    studentId: string,
    rescheduleDetails: RescheduleReviewByStudReqDTO
  ): Promise<void> {
    const { studentText, reviewId, mentorId, slot } = rescheduleDetails;
    const fetchFilter = { _id: reviewId, status: REVIEW_STATUS.PENDING };
    const review = await this._reviewRepository.findOne(fetchFilter);
    if (!review) {
      throw new NotFoundError();
    }

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

    const filter = { studentId, reviewId };
    const update = { status: REVIEW_STATUS.RESCHEDULED };
    const rescheduledReview = await this._reviewRepository.updateReview(
      filter,
      update
    );

    if (!rescheduledReview) {
      throw new NotFoundError();
    }

    const asyncOperations = [];
    const notification: Partial<INotificationEntity> = {
      userId: mentorId,
      type: NOTIFICATION_TYPE.SLOT_RESCHEDULE,
      title: NOTIFICATION_TITLE.REVIEW_RESCHEDULE,
      body: NOTIFICATION_MESSAGE.REVIEW_RESCHEDULE,
      navigate: "/mentor/reviews?tab=rescheduled",
      isRead: false,
    };
    asyncOperations.push(this._notificationRepository.insertOne(notification));

    const rescheduleReview: Partial<IRescheduleReviewEntity> = {
      initiativeBy: ROLES.USER,
      mentorId,
      studentId,
      reviewId,
      slot,
      studentText,
    };
    asyncOperations.push(
      this._rescheduleReviewRepository.insertOne(rescheduleReview)
    );

    eventBus.emit(
      EVENT_EMITTER_TYPE.SEND_PUSH_NOTIFICATION,
      mentorId,
      NOTIFICATION_TITLE.REVIEW_RESCHEDULE,
      NOTIFICATION_MESSAGE.REVIEW_RESCHEDULE
    );

    await Promise.all(asyncOperations);
  }
}
