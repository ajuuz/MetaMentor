import PaginationComponent from "@/components/common/PaginationComponent"
import SelectComponent from "@/components/common/SelectComponent"
import ReviewCard from "@/components/mentor/ReviewCard"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useGetReviewsForMentorQuery } from "@/hooks/tanstack/review"
import type { MentorReviewCard } from "@/types/reviewTypes"
import { type DATE_RANGE, type PENDING_REVIEW_STATE} from "@/utils/constants"
import { useEffect, useState } from "react"

const UpcomingReviews = () => {
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(1)
    const [dateRange,setDateRange]=useState<DATE_RANGE>('all')
    const [pendingReviewState,setPendingReviewState]=useState<PENDING_REVIEW_STATE>('notOver')
    const [reviews,setReviews]=useState<MentorReviewCard[]>([])
    const {data:reviewResponse} = useGetReviewsForMentorQuery('pending',dateRange,currentPage,10,pendingReviewState)

    useEffect(()=>{
        if(reviewResponse){
            setTotalPages(reviewResponse.totalPages)
            setReviews(reviewResponse.reviews)
        }
    },[reviewResponse])

    const handleSelectChange=(selectKey:string,value:string)=>{
        if(selectKey)
        setDateRange(value as DATE_RANGE)
    }

  return (
     <div className="min-h-screen bg-[#f7f7f7] py-10 ps-70 flex flex-col gap-5">
        <div className="flex justify-around">
            <div className="flex gap-5">
            <Label>Date Range</Label>
            <SelectComponent placeHolder="Date Range" selectKey="dateRange" handleSelectChange={handleSelectChange} disabled={false} content={['all','today','week','month']} />
            </div>
            <div className="flex gap-5 items-center border-black border-2 bg-black/10 rounded-lg p-4 ">
            <Label>Over</Label>
            <Switch onClick={()=>setPendingReviewState(prev=>prev==='over'?'notOver':'over')} checked={pendingReviewState==='over'}/>
            </div>
        </div>

        <div onClick={()=>console.log(pendingReviewState)} className="h-full">
            {reviews.map(review=><ReviewCard review={review} isNotOver={pendingReviewState==='notOver'}/>)}
        </div>
        <div className="mt-10">
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
        </div>
    </div>
  )
}

export default UpcomingReviews
