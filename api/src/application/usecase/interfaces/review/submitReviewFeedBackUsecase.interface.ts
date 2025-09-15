
export interface ISubmitReviewResultUsecase {
  execute(
    mentorId: string,
    reviewResultDetails:SubmitReviewResultReqDTO
  ): Promise<void>;
}
