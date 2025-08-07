import { REVIEW_STATUS } from "shared/constants";


export interface ICancelReviewByMentorUsecase{
    execute(mentorId:string,reviewId:string,status:Exclude<REVIEW_STATUS,REVIEW_STATUS.PENDING>):Promise<void>
}