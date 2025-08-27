import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { DomainWithLevel, GetAllDomains } from "@/types/domainTypes";
import type { MutationApiResponse } from "@/types/responseType";




export const getAllDomains=async(currentPage:number,limit:number,sortBy:string,searchTerm:string):Promise<GetAllDomains>=>{
    try{
        const response = await userAxiosInstance.get(`/domains?currentPage=${currentPage}&limit=${limit}&sortBy=${sortBy}&searchTerm=${searchTerm}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const getSpecificDomain=async(domainId:string):Promise<DomainWithLevel>=>{
    try{
        const response = await userAxiosInstance.get(`/domains/${domainId}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const enrollDomain=async (domainId:string):Promise<MutationApiResponse>=>{
     try{
        console.log(domainId)
        const response = await userAxiosInstance.post(`/domains/${domainId}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const getEnrolledDomains=async(currentPage:number,limit:number):Promise<GetAllDomains>=>{
     try{
        const response = await userAxiosInstance.get(`/dashboard?currentPage=${currentPage}&limit=${limit}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const getEnrolledDomain=async(domainId:string)=>{
  try{
         const response = await userAxiosInstance.get(`/dashboard/${domainId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
     }
}