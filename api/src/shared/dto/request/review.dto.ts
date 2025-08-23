

//student
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { PaginationReqDTO } from "./pagination.dto";
import { DATE_RANGE, PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "shared/constants";

export class GetAllReviewsForStudReqDTO extends PaginationReqDTO{
   
    @IsEnum(REVIEW_FILTER_STATUS)
    status!:REVIEW_FILTER_STATUS

    @IsEnum(DATE_RANGE)
    dateRange!:DATE_RANGE

    @IsEnum(PENDING_REVIEW_STATE)
    pendingReviewState?:PENDING_REVIEW_STATE|undefined
}

export class CancelReviewByStudReqDTO{
    @IsString()
    @IsNotEmpty()
    reviewId!:string
}

export class GetAllDomainReviewsForStudReqDTO{
    

}