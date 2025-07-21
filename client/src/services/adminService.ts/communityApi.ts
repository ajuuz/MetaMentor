import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type { GetAllCommunityType } from "@/types/communityTypes";
import type { ApiResponseType } from "@/types/responseType";




export const getAllCommunities=async(currentPage:number,limit:number):Promise<GetAllCommunityType>=>{
    try{
        const response = await adminAxiosInstance.get(`/communities?currentPage=${currentPage}&limit=${limit}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const updateCommunityStatus=async({communityId,status}:{communityId:string,status:boolean}):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
    try{
        const response = await adminAxiosInstance.patch(`/communities/${communityId}`,{status})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}