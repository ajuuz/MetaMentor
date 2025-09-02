import {  getReviewForMentor, getReviewsForMentor } from "@/services/mentorService.ts/reviewApi"
import { getReviewsForStudent, getSlotReviewsForStudent } from "@/services/userService/reviewApi"
import type { GetDomainReviewSlotResponseDTO, GetReviewsForMentorResponse, GetReviewsForStudentResponse, MentorReviewCard } from "@/types/reviewTypes"
import type { DATE_RANGE, PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "@/utils/constants"
import { useQuery } from "@tanstack/react-query"



export const useGetReviewsForMentorQuery=(status:REVIEW_FILTER_STATUS,dateRange:DATE_RANGE,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE)=>{
    return useQuery<GetReviewsForMentorResponse>({
        queryKey:['getReviewsForMentor',status,dateRange,currentPage,limit,pendingReviewState],
        queryFn:()=> getReviewsForMentor(status,dateRange,currentPage,limit,pendingReviewState)
    })
}

export const useGetReviewForMentorQuery=(reviewId:string)=>{
    return useQuery<MentorReviewCard>({
        queryKey:['getReviewForMentor',reviewId],
        queryFn:()=> getReviewForMentor(reviewId)
    })
}

export const useGetReviewsForStudentQuery=(status:REVIEW_FILTER_STATUS,dateRange:DATE_RANGE,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE)=>{
    return useQuery<GetReviewsForStudentResponse>({
        queryKey:['getReviewsForStudent',status,dateRange,currentPage,limit,pendingReviewState],
        queryFn:()=> getReviewsForStudent(status,dateRange,currentPage,limit,pendingReviewState)
    })
}

export const useGetSlotReviewsForStudentQuery=(mentorId:string|undefined,date:Date)=>{
    return useQuery<GetDomainReviewSlotResponseDTO>({
        queryKey:['getDomainReviewsSlot',mentorId,date],
        queryFn:()=> getSlotReviewsForStudent(mentorId!,date!),
        enabled: !!mentorId && !!date,
    })
}