import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig"
import type { ApiResponseType } from "@/types/responseType"
import type { UserDetailsType } from "@/types/userType"




export const getSpecificUser=async():Promise<Required<ApiResponseType<Omit<UserDetailsType,"role"|"isVerified"|"_id">>>>=>{
    try{
        const response = await userAxiosInstance.get('/userDetails')
        return response.data
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}