import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig"
import type { DomainType } from "@/types/domainTypes";



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