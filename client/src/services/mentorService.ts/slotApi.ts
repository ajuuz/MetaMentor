import { mentorInstance } from "@/config/axiosConfig/mentorAxiosConfig"
import type { MutationApiResponse } from "@/types/responseType";
import type { WeekSlotsType } from "@/types/slotTypes";


export const updateSlot=async(weekSlots:WeekSlotsType):Promise<MutationApiResponse>=>{
    try{
        const response = await mentorInstance.patch('/slots',{weekSlots})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const getMentorSlots=async():Promise<WeekSlotsType>=>{
      try{
        const response = await mentorInstance.get('/slots')
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const updateSlotStatus=async({day,slotId,slotStatus}:{day:string,slotId:string,slotStatus:boolean}):Promise<MutationApiResponse>=>{
    try{
        console.log(day,slotId,slotStatus)
        const response = await mentorInstance.patch(`/slots/${day}/${slotId}`,{slotStatus})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}