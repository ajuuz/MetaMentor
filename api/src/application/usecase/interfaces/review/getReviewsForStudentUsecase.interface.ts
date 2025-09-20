import { PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "shared/constants";
import { GetReviewsForStudResDTO } from "application/dto/response/review.dto";

export interface IGetReviewsForStudentUsecase {
  execute(
    studentId: string,
    status: REVIEW_FILTER_STATUS,
    dateRange: string,
    currentPage: number,
    limit: number,
    pendingReviewState?: PENDING_REVIEW_STATE | undefined
  ): Promise<{ reviews: GetReviewsForStudResDTO[]; totalPages: number }>;
}
