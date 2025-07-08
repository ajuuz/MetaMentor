import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { DomainType, GetAllDomainType } from "@/types/domainTypes";
import type { ApiResponseType } from "@/types/responseType";




export const getDomains=async(currentPage:number,limit:number):Promise<Required<ApiResponseType<GetAllDomainType>>>=>{
    try{
        const response = await userAxiosInstance.get(`/domains?currentPage=${currentPage}&limit=${limit}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const getDomain=async(domainId:string):Promise<Required<ApiResponseType<DomainType>>>=>{
    try{
        const response = await userAxiosInstance.get(`/domains/${domainId}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const enrollDomain=async (domainId:string):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
     try{
        console.log(domainId)
        const response = await userAxiosInstance.post(`/domains/${domainId}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const getEnrolledDomain=async():Promise<Required<ApiResponseType<GetAllDomainType>>>=>{
     try{
        const response = await userAxiosInstance.get('/dashboard')
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}