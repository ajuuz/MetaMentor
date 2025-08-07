import { REVIEW_STATUS } from "shared/constants";


export interface ISubmitReviewFeedBackUsecase{
    execute(mentorId:string,reviewId:string,status:Exclude<REVIEW_STATUS,REVIEW_STATUS.CANCELLED|REVIEW_STATUS.PENDING>,feedBack:string):Promise<void>
}