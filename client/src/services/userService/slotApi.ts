import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";
import type { GetDomainReviewSlotResponseDTO } from "@/types/reviewTypes";
import type { DomainSlotsResponseDTO } from "@/types/slotTypes";



export const getDomainSlots=async(domainId:string):Promise<{domainSlots:DomainSlotsResponseDTO[],bookedSlots:GetDomainReviewSlotResponseDTO[]}>=>{
    try{
         const response = await userAxiosInstance.get(`/slots/${domainId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
   }
}


export const slotValidityChecker=async({mentorId,day,slotId}:{mentorId:string,day:string,slotId:string}):Promise<MutationApiResponse>=>{
    try{
         const response = await userAxiosInstance.post(`/slots/${mentorId}/${day}/${slotId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
   }
}