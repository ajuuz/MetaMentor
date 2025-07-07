import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { GetAllDomainType } from "@/types/domainTypes";
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