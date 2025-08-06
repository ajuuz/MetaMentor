import { getMentorReviews } from "@/services/mentorService.ts/reviewApi"
import type { GetMentorReviewsResponse } from "@/types/reviewTypes"
import type { DATE_RANGE, PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"



export const useMentorGetReviewsQuery=(status:REVIEW_FILTER_STATUS,dateRange:DATE_RANGE,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE)=>{
    return useQuery<GetMentorReviewsResponse>({
        queryKey:['mentorGetReviews',status,dateRange,currentPage,limit,pendingReviewState],
        queryFn:()=> getMentorReviews(status,dateRange,currentPage,limit,pendingReviewState)
    })
}