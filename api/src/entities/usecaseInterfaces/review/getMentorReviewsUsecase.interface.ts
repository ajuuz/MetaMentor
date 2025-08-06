import { PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "shared/constants";
import { GetMentorReviewsResponseDTO } from "shared/dto/reviewDTO";



export interface IGetMentorReviewsUsecase{
    execute(mentorId:string,status:REVIEW_FILTER_STATUS,dateRange:string,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE|undefined):Promise<Omit<GetMentorReviewsResponseDTO,'totalDocuments'>>
}