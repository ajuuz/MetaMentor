import { PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "shared/constants";
import { ReviewsDataForStudentResponseDTO } from "shared/dto/reviewDTO";


export interface IGetReviewsForStudentUsecase{
    execute(studentId:string,status:REVIEW_FILTER_STATUS,dateRange:string,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE|undefined):Promise<Omit<ReviewsDataForStudentResponseDTO,'totalDocuments'>>
}