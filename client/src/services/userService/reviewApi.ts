import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";
import type { GetStudentReviewResponseDTO } from "@/types/reviewTypes";
import type { DATE_RANGE, PENDING_REVIEW_STATE, REVIEW_FILTER_STATUS } from "@/utils/constants";


export const getReviews=async(type:'upcoming'|'completed'):Promise<GetStudentReviewResponseDTO[]>=>{
    try{
        const response = await userAxiosInstance.get(`/reviews?type=${type}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const getReviewsForStudent=async(status:REVIEW_FILTER_STATUS,dateRange:DATE_RANGE,currentPage:number,limit:number,pendingReviewState?:PENDING_REVIEW_STATE)=>{
      try{
        const response = await userAxiosInstance.get(`/reviews?status=${status}&dateRange=${dateRange}&currentPage=${currentPage}&limit=${limit}&pendingReviewState=${pendingReviewState}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

    export const getSlotReviewsForStudent=async(mentorId:string|undefined,date:string)=>{
      try{
        const response = await userAxiosInstance.get(`/reviews/${mentorId}/${date}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const cancelReviewByStudent=async(reviewId:string):Promise<MutationApiResponse>=>{
      try{
        const response = await userAxiosInstance.patch(`/reviews/${reviewId}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}