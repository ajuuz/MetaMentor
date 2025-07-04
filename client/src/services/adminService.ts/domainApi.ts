import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig"
import type { DomainType, GetAllDomainType } from "@/types/domainTypes";
import type { ApiResponseType } from "@/types/responseType";

export const addDomain=async(domainDetails:DomainType)=>{
    try{
        console.log(domainDetails)
        const response = await adminAxiosInstance.post('/domains',domainDetails)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const getDomains=async(currentPage:number,limit:number):Promise<Required<ApiResponseType<GetAllDomainType>>>=>{
    try{
        console.log("backend call")
        const response = await adminAxiosInstance.get(`/domains?currentPage=${currentPage}&limit=${limit}`)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const updateDomainStatus=async({domainId,status}:{domainId:string,status:boolean}):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
    try{
        const response = await adminAxiosInstance.patch(`/domains/${domainId}`,{status})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}