import { PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "shared/constants";
import { GetReviewsForMentResDTO } from "application/dto/response/review.dto";

export interface IGetMentorReviewsUsecase {
  execute(
    mentorId: string,
    status: REVIEW_FILTER_STATUS,
    dateRange: string,
    currentPage: number,
    limit: number,
    pendingReviewState?: PENDING_REVIEW_STATE | undefined
  ): Promise<{ reviews: GetReviewsForMentResDTO[]; totalPages: number }>;
}
