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


export const slotValidityChecker=async({mentorId,day,slotId}:{mentorId:string,day:string,slotId:string})=>{
    try{
         console.log(mentorId,day,slotId)
         const response = await userAxiosInstance.post(`/slots/${mentorId}/${day}/${slotId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
   }
}