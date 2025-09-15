import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";

export interface IGetRescheduledReviewUsecase {
  execute(reviewId: string): Promise<IRescheduleReviewEntity>;
}
