import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";
import type { GetDomainReviewSlotResponseDTO } from "@/types/reviewTypes";
import type { DaysType, DomainSlotsResponseDTO, Slot } from "@/types/slotTypes";



export const getDomainSlots=async(domainId:string):Promise<{domainSlots:DomainSlotsResponseDTO[],bookedSlots:GetDomainReviewSlotResponseDTO[]}>=>{
    try{
         const response = await userAxiosInstance.get(`/slots/${domainId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
   }
}


export const getSlotsForStud=async(mentorId:string|undefined,day:string):Promise<Slot[]>=>{
    try{
         const response = await userAxiosInstance.get(`/slots/${mentorId}/${day}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
   }
}



export const slotValidityChecker=async({mentorId,date,slotId}:{mentorId:string,date:Date,slotId:string}):Promise<MutationApiResponse>=>{
    try{
         const response = await userAxiosInstance.post(`/slots/${mentorId}/${date.toISOString()}/${slotId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
   }
}