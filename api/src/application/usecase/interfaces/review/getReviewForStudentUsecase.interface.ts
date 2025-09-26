import { GetReviewForStudResDTO } from "application/dto/response/review.dto";

export interface IGetReviewForStudentUsecase {
  execute(studentId: string, reviewId: string): Promise<GetReviewForStudResDTO>;
}
