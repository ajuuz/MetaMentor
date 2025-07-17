import ReviewCard from "@/components/common/ReviewCard"
import { getReviews } from "@/services/userService/reviewApi"
import type { GetStudentReviewResponseDTO } from "@/types/reviewTypes"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export const UpcomingReviews=()=>{

    const [reviews,setReviews]=useState<GetStudentReviewResponseDTO[]>([])
    const {data:upcomingReviews}=useQuery({
        queryKey:['upcomingReviews'],
        queryFn:()=>getReviews('upcoming'),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: false
    })

    useEffect(()=>{
        if(upcomingReviews){
            setReviews(upcomingReviews)
        }
    },[upcomingReviews])    

    return(
        <div className="min-h-screen flex justify-center flex-col items-center gap-5 py-10">
            {
                reviews.map((review)=>(
                    <ReviewCard domainName={review.domainName} feedBack={review.feedBack} level={review.level} mentorName={review.mentorName} payment={review.payment} slot={review.slot} status={review.status}/>
                ))
            }
        </div>
    )
}