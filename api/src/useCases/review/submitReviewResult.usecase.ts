import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IPushNotificationService } from "entities/serviceInterfaces/pushNotificationService.interface";
import { ISubmitReviewResultUsecase } from "entities/usecaseInterfaces/review/submitReviewFeedBackUsecase.interface";
import {
  NOTIFICATION_MESSAGE,
  NOTIFICATION_TITLE,
} from "shared/constants";
import { SubmitReviewResultReqDTO } from "shared/dto/request/review.dto";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";

@injectable()
export class SubmitReviewResultUsecase implements ISubmitReviewResultUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository,

    @inject("IPushNotificationService")
    private _pushNotificationService: IPushNotificationService
  ) {}

  async execute(
    mentorId: string,
    reviewResultDetails: SubmitReviewResultReqDTO
  ): Promise<void> {
    const { status, reviewId, feedBack } = reviewResultDetails;

    const filter = { mentorId, reviewId };
    const update = { status, feedBack };
    const updatedReview = await this._reviewRepository.updateReview(
      filter,
      update
    );
    if (!updatedReview) {
      throw new NotFoundError();
    }
    const userId = updatedReview.studentId.toString();
    this._pushNotificationService.sendNotification(
      userId,
      NOTIFICATION_TITLE.REVIEW_FEEDBACK_UPDATED,
      NOTIFICATION_MESSAGE.REVIEW_FEEDBACK_UPDATED
    );
  }
}
