import { RescheduleReviewByStudReqDTO } from "application/dto/requset/review.dto";

export interface IRescheduleReviewByStudentUsecase {
  execute(
    studentId: string,
    rescheduleDetails: RescheduleReviewByStudReqDTO
  ): Promise<void>;
}
