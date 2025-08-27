import { mentorInstance } from "@/config/axiosConfig/mentorAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";
import type { MentorReviewCard } from "@/types/reviewTypes";
import type { DATE_RANGE, PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS, ReviewStatus } from "@/utils/constants";


export const getReviewsForMentor=async(status:REVIEW_FILTER_STATUS,dateRange:DATE_RANGE,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE)=>{
      try{
        const response = await mentorInstance.get(`/reviews?status=${status}&dateRange=${dateRange}&currentPage=${currentPage}&limit=${limit}&pendingReviewState=${pendingReviewState}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const getReviewForMentor=async(reviewId:string):Promise<MentorReviewCard>=>{
      try{
        const response = await mentorInstance.get(`/reviews/${reviewId}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const cancelReviewByMentor=async(reviewId:string):Promise<MutationApiResponse>=>{
      try{
        const response = await mentorInstance.patch(`/reviews/${reviewId}/cancel`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}
export const submitReviewFeedBack=async({reviewId,...reviewDetails}:{reviewId:string,status:ReviewStatus,feedBack:string,theory:number,practical:number}):Promise<MutationApiResponse>=>{
      try{
        const response = await mentorInstance.patch(`/reviews/${reviewId}/result`,reviewDetails)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}