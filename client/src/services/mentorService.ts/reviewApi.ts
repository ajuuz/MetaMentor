import { mentorInstance } from "@/config/axiosConfig/mentorAxiosConfig";
import type { DATE_RANGE, PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "@/utils/constants";


export const getMentorReviews=async(status:REVIEW_FILTER_STATUS,dateRange:DATE_RANGE,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE)=>{
      try{
        const response = await mentorInstance.get(`/reviews?status=${status}&dateRange=${dateRange}&currentPage=${currentPage}&limit=${limit}&pendingReviewState=${pendingReviewState}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}