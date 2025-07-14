import { mentorInstance } from "@/config/axiosConfig/mentorAxiosConfig"
import type { ApiResponseType } from "@/types/responseType";
import type { WeekSlotType } from "@/types/slotTypes";


export const addSlot=async(weekSlots:WeekSlotType):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
    try{
        console.log(weekSlots)
        const response = await mentorInstance.post('/slots',weekSlots)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}