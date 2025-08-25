
export interface ICancelReviewByMentorUsecase{
    execute(mentorId:string,reviewId:string):Promise<void>
}