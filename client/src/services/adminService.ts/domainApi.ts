import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig"
import type { DomainCreationType,GetAllDomains } from "@/types/domainTypes";
import type { MutationApiResponse } from "@/types/responseType";

export const addDomain=async(domainDetails:DomainCreationType):Promise<MutationApiResponse>=>{
    try{
        console.log(domainDetails)
        const response = await adminAxiosInstance.post('/domains',domainDetails)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const getAdminAllDomains=async(currentPage:number,limit:number):Promise<GetAllDomains>=>{
    try{
        console.log(currentPage,limit)
        const response = await adminAxiosInstance.get(`/domains?currentPage=${currentPage}&limit=${limit}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const updateDomainStatus=async({domainId,status}:{domainId:string,status:boolean}):Promise<MutationApiResponse>=>{
    try{
        const response = await adminAxiosInstance.patch(`/domains/${domainId}`,{status})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}