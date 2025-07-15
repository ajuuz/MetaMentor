import { mentorInstance } from "@/config/axiosConfig/mentorAxiosConfig"
import type { ApiResponseType } from "@/types/responseType";
import type { SlotType, WeekSlotsType } from "@/types/slotTypes";


export const updateSlot=async(weekSlots:WeekSlotsType):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
    try{
        const response = await mentorInstance.post('/slots',{weekSlots})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const getSlots=async():Promise<Required<ApiResponseType<SlotType>>>=>{
      try{
        const response = await mentorInstance.get('/slots')
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}