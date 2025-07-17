import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { GetStudentReviewResponseDTO } from "@/types/reviewTypes";


export const getReviews=async(type:'upcoming'|'completed'):Promise<GetStudentReviewResponseDTO[]>=>{
    try{
        const response = await userAxiosInstance.get(`/reviews?type=${type}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}