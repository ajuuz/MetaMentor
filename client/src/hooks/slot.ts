import { getMentorSlots } from "@/services/mentorService.ts/slotApi"
import type { WeekSlotsType } from "@/types/slotTypes"
import { useQuery } from "@tanstack/react-query"


export const useMentorGetSlotsQuery=()=>{
    return useQuery<WeekSlotsType>({
        queryKey:['mentorGetSlots'],
        queryFn:()=> getMentorSlots()
    })
}