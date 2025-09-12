import { getSlotsOfADayForMent } from "@/services/mentorService.ts/slotApi"
import { getSlotsForStud } from "@/services/userService/slotApi"
import type { DaysType, Slot } from "@/types/slotTypes"
import { useQuery } from "@tanstack/react-query"

//==========student================//
export const useGetSlotsForStudQuery=(mentorId:string|undefined,day:DaysType|null)=>{
    return useQuery<Slot[]>({
        queryKey:['getSlotsForStud',mentorId,day],
        queryFn:()=> getSlotsForStud(mentorId,day!),
        enabled: !!mentorId && !!day,
    })
}

//==========mentor================//
export const useGetSlotsForMentQuery=(day:DaysType|null)=>{
    return useQuery<Slot[]>({
        queryKey:['getSlotsForStud',day],
        queryFn:()=> getSlotsOfADayForMent(day!),
        enabled: !!day,
    })
}