

export interface IRescheduleReviewSubmitByMentor{
    execute(reviewId:string,status:'accept'|'cancel'):Promise<void>
}