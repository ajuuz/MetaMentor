import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type { GetAllMentorResponseType, MentorDataType } from "@/types/mentorType";
import type { ApiResponseType, MutationApiResponse } from "@/types/responseType";


type GetAllMentorArgumentType={
    currentPage:number,
    limit:number,
    isVerified:boolean
}
export const getAllMentors=async({
        currentPage,
        limit,
        isVerified
    }:GetAllMentorArgumentType
    ):Promise<Required<ApiResponseType<GetAllMentorResponseType>>>=>{
    try{
        const response = await adminAxiosInstance.get(`/mentors?currentPage=${currentPage}&limit=${limit}&isVerified=${isVerified}`);
        return response.data;
    }
    catch(error:any){
        console.log(error)
        throw error?.response?.data || error;
    }
}

export const getSpecificMentor=async(mentorId:string):Promise<Required<ApiResponseType<MentorDataType>>>=>{
    try{
        const response = await adminAxiosInstance.get(`/mentors/${mentorId}`);
        return response.data
    }catch(error:any){
         throw error?.response?.data || error;
    }
}

export const acceptMentorApplication=async(
    {mentorId,email,status,reason}:{mentorId:string,email:string,status:'accepted'|'rejected',reason?:string}
    ):Promise<MutationApiResponse>=>{
    try{
        const response = await adminAxiosInstance.patch(`/mentors/${mentorId}/${status}`,{email,reason});
        return response.data
    }
    catch(error:any){
        throw error?.response?.data || error;
    }
}


export const updateMentorStatus=async({mentorId,status}:{mentorId:string,status:boolean}):Promise<MutationApiResponse>=>{
    try{
        const response = await adminAxiosInstance.patch(`/mentors/${mentorId}`,{status})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error;
    }
}