import PaginationComponent from "@/components/common/PaginationComponent"
import SelectComponent from "@/components/common/SelectComponent"
import ReviewCard from "@/components/mentor/ReviewCard"
import { Label } from "@/components/ui/label"
import { useMentorGetReviewsQuery } from "@/hooks/tanstack/review"
import type { MentorReviewCard } from "@/types/reviewTypes"
import { type DATE_RANGE, type REVIEW_FILTER_STATUS} from "@/utils/constants"
import { useEffect, useState } from "react"

const CompletedReviews = () => {
    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(1)
    const [dateRange,setDateRange]=useState<DATE_RANGE>('all')
    const [status,setStatus]=useState<REVIEW_FILTER_STATUS>('completed')
    const [reviews,setReviews]=useState<MentorReviewCard[]>([])
    const {data:reviewResponse} = useMentorGetReviewsQuery(status,dateRange,currentPage,10)

    useEffect(()=>{
        if(reviewResponse){
            setTotalPages(reviewResponse.totalPages)
            setReviews(reviewResponse.reviews)
        }
    },[reviewResponse])

    const handleSelectChange=(selectKey:string,value:string)=>{
        if(selectKey==='dateRange')
            setDateRange(value as DATE_RANGE)
        else if(selectKey==='status')
            setStatus(value as REVIEW_FILTER_STATUS)
    }

  return (
     <div className="min-h-screen bg-[#f7f7f7] py-10 ps-70 flex flex-col gap-5">
        <div className="flex justify-around">
            <div className="flex gap-5">
            <Label>Date Range</Label>
            <SelectComponent placeHolder="Date Range" selectKey="dateRange" handleSelectChange={handleSelectChange} disabled={false} content={['all','today','week','month']} />
            </div>
            <div className="flex gap-5">
            <Label>Status</Label>
            <SelectComponent placeHolder="Status" selectKey="status" handleSelectChange={handleSelectChange} disabled={false} content={['completed','pass','fail','cancelled']} />
            </div>
        </div>

        <div className="h-full">
            {reviews.map(review=><ReviewCard review={review}/>)}
        </div>
        <div className="mt-10">
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
        </div>
    </div>
  )
}

export default CompletedReviews
