import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type { GetAllCommunity } from "@/types/communityTypes";
import type { MutationApiResponse } from "@/types/responseType";




export const getAllCommunities=async(currentPage:number,limit:number):Promise<GetAllCommunity>=>{
    try{
        const response = await adminAxiosInstance.get(`/communities?currentPage=${currentPage}&limit=${limit}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const updateCommunityStatus=async({communityId,status}:{communityId:string,status:boolean}):Promise<MutationApiResponse>=>{
    try{
        const response = await adminAxiosInstance.patch(`/communities/${communityId}`,{status})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}