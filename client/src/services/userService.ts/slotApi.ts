import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { ApiResponseType } from "@/types/responseType";
import type { DomainSlotsResponseDTO } from "@/types/slotTypes";



export const getDomainSlots=async(domainId:string):Promise<Required<ApiResponseType<DomainSlotsResponseDTO[]>>>=>{
    try{
         const response = await userAxiosInstance.get(`/slots/${domainId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
   }
}