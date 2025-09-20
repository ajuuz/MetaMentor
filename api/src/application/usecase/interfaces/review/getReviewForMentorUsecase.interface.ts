import { GetReviewForMentResDTO } from "application/dto/response/review.dto";

export interface IGetReviewForMentorUsecase {
  execute(mentorId: string, reviewId: string): Promise<GetReviewForMentResDTO>;
}
