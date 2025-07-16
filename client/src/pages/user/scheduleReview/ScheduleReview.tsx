'use client'

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getDomainSlots, slotValidityChecker } from "@/services/userService.ts/slotApi"
import type { DomainSlotsResponseDTO } from "@/types/slotTypes"
import { toTimeString } from "@/utils/helperFunctions/toTimeString"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function ScheduleReview() {
    const [domainsSlots,setDomainsSlots]=useState<DomainSlotsResponseDTO[]>([]);
    const {domainId} = useParams();

    if(!domainId){
        return <div>some thing wrong</div>
    }

    const {mutate:slotValidityCheckerMutation}=useMutation({
        mutationFn:slotValidityChecker,
        onSuccess:(response)=>{
          console.log(response)
        },
        onError:(error)=>{
          console.log(error)
        }
    })

    useEffect(()=>{
       (async function getDomainSlotFetch(){
           try{
               const response = await getDomainSlots(domainId);
               setDomainsSlots(response.data)
           }
           catch(error){
               console.log(error)
           }
       })()
    },[])

    const handleSelectSlot=(mentorId:string,day:string,slotId:string)=>{
        slotValidityCheckerMutation({mentorId,day,slotId})
    }

  return (
    <div>
        {
        domainsSlots.map(content=>(
        <Card className="max-w-5xl mx-auto p-4 rounded-2xl border shadow-md bg-white">
            <div className="flex gap-6 items-start">
              {/* Left: Mentor Info */}
              <div className="flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img
                      src={content.mentor.profileImage}
                      alt={content.mentor.name}
                      width={150}
                      height={150}
                      className="rounded-xl object-cover"
                      />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm text-sm leading-tight">
                    <p>{content.mentor.about}</p>
                    <p>{content.mentor.skills.join('|')}</p>
                    <p>{content.mentor.workedAt.join('|')}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <h2 className="text-lg font-semibold mt-3 cursor-pointer">{content.mentor.name} {content.mentor.country}</h2>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm text-sm leading-tight">
                    <p>{content.mentor.about}</p>
                    <p>{content.mentor.skills.join('|')}</p>
                    <p>{content.mentor.workedAt.join('|')}</p>
                  </TooltipContent>
                </Tooltip>
             </TooltipProvider>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                {Object.entries(content.weekSlots).map(([day, slots]) => (
                    slots.length>0
                    && 
                    <div key={day} className="flex flex-col">
                      <h3 className="text-sm font-semibold text-gray-700 mb-1">{day}</h3>
                      <ScrollArea className={`${slots.length>5 && "max-h-[150px]"} rounded-md border p-4`}>
                      <div className="flex flex-wrap gap-2">
                        {
                          slots.map((slot, index) => (
                            slot.enabled &&
                          <div onClick={()=>handleSelectSlot(content.mentor._id,day,slot._id)} key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-md">
                              {toTimeString(slot.start)} – {toTimeString(slot.end)}
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

