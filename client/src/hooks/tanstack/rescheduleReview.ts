import { getRescheduledReview } from "@/services/userService/rescheduledReviewApi"
import type { IRescheduleReviewEntity } from "@/types/entity/rescheduledReview"
import { useQuery } from "@tanstack/react-query"


//==========mentor================//
export const useGetRescheduledReviewQuery=(reviewId:string)=>{
    return useQuery<IRescheduleReviewEntity>({
        queryKey:['getRescheduledReview'],
        queryFn:()=> getRescheduledReview(reviewId),
    })
}