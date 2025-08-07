import PaginationComponent from "@/components/common/PaginationComponent"
import ReviewCard from "@/components/common/ReviewCard"
import SelectComponent from "@/components/common/SelectComponent"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useGetReviewsForStudentQuery } from "@/hooks/tanstack/review"
import type { GetStudentReviewResponseDTO } from "@/types/reviewTypes"
import type { DATE_RANGE, PENDING_REVIEW_STATE } from "@/utils/constants"
import { useEffect, useState } from "react"


export const UpcomingReviews=()=>{

    const [reviews,setReviews]=useState<GetStudentReviewResponseDTO[]>([])
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(1)
    const [dateRange,setDateRange]=useState<DATE_RANGE>('all')
    const [pendingReviewState,setPendingReviewState]=useState<PENDING_REVIEW_STATE>('notOver')
    const {data:reviewsResponse}=useGetReviewsForStudentQuery('pending',dateRange,currentPage,10,pendingReviewState)

    useEffect(()=>{
        if(reviewsResponse){
            setReviews(reviewsResponse.reviews)
            console.log(reviewsResponse.reviews)
            setTotalPages(reviewsResponse.totalPages)
        }
    },[reviewsResponse])  
    
    const handleSelectChange=(selectKey:string,value:string)=>{
        if(selectKey)
        setDateRange(value as DATE_RANGE)
    }

    return(
        <div className="flex flex-col gap-5  z-1  relative">
            <div className="flex justify-around">
                <div className="flex gap-5 items-center">
                <Label>Date Range</Label>
                <SelectComponent placeHolder="Date Range" selectKey="dateRange" handleSelectChange={handleSelectChange} disabled={false} content={['all','today','week','month']} />
                </div>
                <div className="flex gap-5 items-center border-black border-2 bg-black/10 rounded-lg p-4 ">
                <Label>Over</Label>
                <Switch onClick={()=>setPendingReviewState(prev=>prev==='over'?'notOver':'over')} checked={pendingReviewState==='over'}/>
                </div>
            </div>
            <div className="w-full">
            {
                reviews.length===0
                ?<div>No upcoming reviews...</div>
                :reviews.map((review)=>(
                    <ReviewCard review={review} isNotOver={pendingReviewState==='notOver'}/>
                ))
            }
            </div>
            <div className="mt-10">
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
        </div>
        </div>
    )
}