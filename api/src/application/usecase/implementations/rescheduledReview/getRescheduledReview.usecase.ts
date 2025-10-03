import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";
import { NotFoundError } from "domain/errors/notFounError";
import { IRescheduleReviewRepository } from "domain/repositoryInterfaces/rescheduleReviewRepository.interface";

import { IGetRescheduledReviewUsecase } from "application/usecase/interfaces/rescheduledReview/getRescheduledReviewUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetRescheduledReviewUsecase
  implements IGetRescheduledReviewUsecase
{
  constructor(
    @inject("IRescheduleReviewRepository")
    private _rescheduleReviewRepository: IRescheduleReviewRepository
  ) {}
  async execute(reviewId: string): Promise<IRescheduleReviewEntity> {
    const rescheduledReview = await this._rescheduleReviewRepository.findOne({
      reviewId,
    });
    if (!rescheduledReview) throw new NotFoundError();
    return rescheduledReview;
  }
}
