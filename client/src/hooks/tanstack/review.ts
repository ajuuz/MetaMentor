import {  getReviewForMentor, getReviewsForMentor } from "@/services/mentorService.ts/reviewApi"
import type { GetMentorReviewsResponse, MentorReviewCard } from "@/types/reviewTypes"
import type { DATE_RANGE, PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"



export const useGetReviewsForMentorQuery=(status:REVIEW_FILTER_STATUS,dateRange:DATE_RANGE,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE)=>{
    return useQuery<GetMentorReviewsResponse>({
        queryKey:['mentorGetReviews',status,dateRange,currentPage,limit,pendingReviewState],
        queryFn:()=> getReviewsForMentor(status,dateRange,currentPage,limit,pendingReviewState)
    })
}

export const useGetReviewForMentorQuery=(reviewId:string)=>{
    return useQuery<MentorReviewCard>({
        queryKey:['mentorGetReviews',reviewId],
        queryFn:()=> getReviewForMentor(reviewId)
    })
}