import { SubmitReviewResultReqDTO } from "shared/dto/request/review.dto";

export interface ISubmitReviewResultUsecase {
  execute(
    mentorId: string,
    reviewResultDetails:SubmitReviewResultReqDTO
  ): Promise<void>;
}
