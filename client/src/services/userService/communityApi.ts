import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { CreateCommunityPostDTO } from "@/types/communityPostTypes";
import type { GetAllDomains } from "@/types/domainTypes";
import type { MutationApiResponse } from "@/types/responseType";



export const createCommunityPost=async (communityPostData:CreateCommunityPostDTO):Promise<MutationApiResponse>=>{
     try{
        const response = await userAxiosInstance.post(`/communities/${communityPostData.communityId}/post`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const getEnrolledCommunities=async(currentPage:number,limit:number):Promise<GetAllDomains>=>{
     try{
        const response = await userAxiosInstance.get(`/communities?currentPage=${currentPage}&limit=${limit}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}