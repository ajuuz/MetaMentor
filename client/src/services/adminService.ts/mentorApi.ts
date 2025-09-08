import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type { GetAllMentorResponseType } from "@/types/mentorType";
import type { GetMentorApplicationDetialsForAdminRes } from "@/types/response/mentor";
import type { MutationApiResponse } from "@/types/responseType";


type GetAllMentorArgumentType={
    currentPage:number,
    limit:number,
    isVerified:boolean,
    sortBy:string,
    searchTerm:string,
    selectedDomains:string[]
}
export const getAllMentors=async({
        currentPage,
        limit,
        isVerified,
        sortBy,
        searchTerm,
        selectedDomains
    }:GetAllMentorArgumentType
    ):Promise<GetAllMentorResponseType>=>{
    try{
        console.log(selectedDomains)
        const response = await adminAxiosInstance.get(`/mentors?currentPage=${currentPage}&limit=${limit}&isVerified=${isVerified}&sortBy=${sortBy}&searchTerm=${searchTerm}&selectedDomains=${selectedDomains.join(',')}`);
        return response.data;
    }
    catch(error:any){
        console.log(error)
        throw error?.response?.data || error;
    }
}

export const getMentorApplicationDetailsForAdmin=async(mentorId:string):Promise<GetMentorApplicationDetialsForAdminRes>=>{
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