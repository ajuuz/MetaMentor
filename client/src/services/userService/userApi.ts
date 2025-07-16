import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig"
import type { ApiResponseType } from "@/types/responseType"
import type { UserDetailsType } from "@/types/userType"




export const getSpecificUser=async():Promise<Required<ApiResponseType<Omit<UserDetailsType,"role"|"isVerified"|"_id">>>>=>{
    try{
        const response = await userAxiosInstance.get('/user')
        return response.data
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const updateProfile=async(updatedData:Partial<Omit<UserDetailsType,"role"|"_id"|"email"|"isVerified">>):Promise<Omit<ApiResponseType<undefined>,"data">>=>{
    try{
        const response = await userAxiosInstance.patch('/user',{updatedData})
        return response.data
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}