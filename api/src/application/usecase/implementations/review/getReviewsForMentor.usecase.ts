import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";

import { GetReviewsForMentResDTO } from "application/dto/response/review.dto";
import { IGetMentorReviewsUsecase } from "application/usecase/interfaces/review/getReviewsForMentorUsecase.interface";
import { plainToInstance } from "class-transformer";
import {
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
  REVIEW_STATUS,
} from "shared/constants";
import { dateRangeCalculator } from "shared/utils/dateRangeCalculator";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMentorReviewsUsecase implements IGetMentorReviewsUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(
    mentorId: string,
    status: REVIEW_FILTER_STATUS,
    dateRange: string,
    currentPage: number,
    limit: number,
    pendingReviewState?: PENDING_REVIEW_STATE | undefined
  ): Promise<{ reviews: GetReviewsForMentResDTO[]; totalPages: number }> {
    const skip: number = (currentPage - 1) * limit;
    const filter: any = { mentorId };
    switch (status) {
      case REVIEW_FILTER_STATUS.COMPLETED:
        filter.status = [REVIEW_STATUS.PASS, REVIEW_STATUS.FAIL];
        break;

      case REVIEW_FILTER_STATUS.PASS:
        filter.status = [REVIEW_STATUS.PASS];
        break;

      case REVIEW_FILTER_STATUS.FAIL:
        filter.status = [REVIEW_STATUS.FAIL];
        break;

      case REVIEW_FILTER_STATUS.CANCELLED:
        filter.status = [REVIEW_STATUS.CANCELLED];
        break;

      case REVIEW_FILTER_STATUS.RESCHEDULED:
        filter.status = [REVIEW_STATUS.RESCHEDULED];
        break;

      default:
        filter.status = [REVIEW_STATUS.PENDING];
        break;
    }

    if (dateRange !== "all") {
      const { start, end } = dateRangeCalculator(dateRange);
      filter.dateRange = { start, end };
    }

    if (pendingReviewState) {
      filter.pendingReviewState = pendingReviewState;
    }

    const { data, totalDocuments } =
      await this._reviewRepository.findReviewsForMentor(filter, skip, limit);
    const reviews = plainToInstance(GetReviewsForMentResDTO, data, {
      excludeExtraneousValues: true,
    });
    const totalPages = Math.ceil(totalDocuments / limit);
    return { reviews, totalPages };
  }
}
