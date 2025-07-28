import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig"
import type { DomainEntity } from "@/types/domainTypes"
import type { MentorRegistrationFormDataType } from "@/types/mentorType"
import type { ApiResponseType, MutationApiResponse } from "@/types/responseType"

export const registerForm = async(formData:MentorRegistrationFormDataType):Promise<MutationApiResponse>=>{
    try{
        const response = await userAxiosInstance.post('/mentor/register',formData)
        return response.data;
    }
    catch(error:any){
        throw error?.response.data || error
    }
}


export const getDomainsNameAndId=async():Promise<Required<ApiResponseType<Pick<DomainEntity,"_id"|'name'>[]>>>=>{
    try{
        const response = await userAxiosInstance.get('/mentor/domains')
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}