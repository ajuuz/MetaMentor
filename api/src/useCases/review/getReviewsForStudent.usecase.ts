import { plainToInstance } from "class-transformer";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { IGetReviewsForStudentUsecase } from "entities/usecaseInterfaces/review/getReviewsForStudentUsecase.interface";
import {
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
  REVIEW_STATUS,
} from "shared/constants";
import { GetReviewsForStudResDTO } from "shared/dto/response/review.dto";
import { dateRangeCalculator } from "shared/utils/dateRangeCalculator";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReviewsForStudentUsecase
  implements IGetReviewsForStudentUsecase
{
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(
    studentId: string,
    status: REVIEW_FILTER_STATUS,
    dateRange: string,
    currentPage: number,
    limit: number,
    pendingReviewState?: PENDING_REVIEW_STATE | undefined
  ): Promise<{ reviews: GetReviewsForStudResDTO[]; totalPages: number }> {
    const skip: number = (currentPage - 1) * limit;
    let filter: any = { studentId };
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
      await this._reviewRepository.findReviewsForStudent(filter, skip, limit);
    const reviews = plainToInstance(GetReviewsForStudResDTO, data, {
      excludeExtraneousValues: true,
    });
    const totalPages = Math.ceil(totalDocuments / limit);
    return { reviews, totalPages };
  }
}
