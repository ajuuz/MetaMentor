'use client'

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getDomainSlots } from "@/services/userService.ts/slotApi"
import type { DomainSlotsResponseDTO } from "@/types/slotTypes"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function ScheduleReview() {
    const [slots,setSlots]=useState<DomainSlotsResponseDTO[]>([]);
    const {domainId} = useParams();

    if(!domainId){
        return <div>some thing wrong</div>
    }

    useEffect(()=>{
       (async function getDomainSlotFetch(){
           try{
               const response = await getDomainSlots(domainId);
               setSlots(response.data)
           }
           catch(error){
               console.log(error)
           }
       })()
    },[])

  return (
    <div>
        {
        slots.map(slot=>(
        <Card className="max-w-5xl mx-auto p-4 rounded-2xl border shadow-md bg-white">
            <div className="flex gap-6 items-start">
              {/* Left: Mentor Info */}
              <div className="flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img
                      src={slot.mentor.profileImage}
                      alt={slot.mentor.name}
                      width={150}
                      height={150}
                      className="rounded-xl object-cover"
                      />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm text-sm leading-tight">
                    <p>{slot.mentor.about}</p>
                    <p>{slot.mentor.skills.join('|')}</p>
                    <p>{slot.mentor.workedAt.join('|')}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <h2 className="text-lg font-semibold mt-3 cursor-pointer">{slot.mentor.name} {slot.mentor.country}</h2>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm text-sm leading-tight">
                    <p>{slot.mentor.about}</p>
                    <p>{slot.mentor.skills.join('|')}</p>
                    <p>{slot.mentor.workedAt.join('|')}</p>
                  </TooltipContent>
                </Tooltip>
             </TooltipProvider>
              </div>

              {/* Right: Weekly Slots */}
              <div className="grid grid-cols-2 gap-4 w-full">
                {Object.entries(slot.weekSlots).map(([day, slots]) => (
                    slots.length>0
                    && 
                    <div key={day} className="flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">{day}</h3>
                      <ScrollArea className={`${slots.length>5 && "h-[150px]"} rounded-md border p-4`}>
                      <div className="flex flex-wrap gap-2">
                        {
                          slots.map((slot, index) => (
                          <div key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                              {slot.start} – {slot.end}
                            </div>
                          ))
                        }
                      </div>
                      </ScrollArea>
                      </div>
                    
                // <div>kdlsf</div>
                ))}
              </div>
            </div>
          </Card>
))
}
    </div>
  )
}

