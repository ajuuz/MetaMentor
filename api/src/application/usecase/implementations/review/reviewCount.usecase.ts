import { IReviewEntity } from "domain/entities/reviewModel.entity";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";

import { IReviewCountUsecase } from "application/usecase/interfaces/review/reviewCountUsecase.interface";
import { REVIEW_STATUS, ROLES } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class ReviewCountUsecase implements IReviewCountUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}
  async execute(
    role: ROLES,
    userId?: string
  ): Promise<{ _id: REVIEW_STATUS; count: number }[]> {
    const filters: Partial<Pick<IReviewEntity, "studentId" | "mentorId">> = {};
    if (role === ROLES.MENTOR) filters.mentorId = userId;
    else if (role === ROLES.USER) filters.studentId = userId;

    const counts = await this._reviewRepository.reviewCount(filters);
    return counts;
  }
}
