import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
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