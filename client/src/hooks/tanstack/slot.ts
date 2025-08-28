import { getSlotsForStud } from "@/services/userService/slotApi"
import type { Slot } from "@/types/slotTypes"
import { useQuery } from "@tanstack/react-query"


export const useGetSlotsForStudQuery=(mentorId:string|undefined,day:string)=>{
    return useQuery<Slot[]>({
        queryKey:['getSlotsForStud',mentorId,day],
        queryFn:()=> getSlotsForStud(mentorId,day),
        enabled: !!mentorId && !!day,
    })
}