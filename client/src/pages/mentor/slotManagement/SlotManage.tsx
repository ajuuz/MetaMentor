import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import  TimePeriod from '@/components/mentor/TimePeriod'
import { toMinutes } from '@/utils/helperFunctions/convertToMinutes'
import { toTimeString } from '@/utils/helperFunctions/toTimeString'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMutation } from '@tanstack/react-query'
import {  updateSlot, updateSlotStatus } from '@/services/mentorService.ts/slotApi'
import { toast } from 'sonner'
import type { DayOfWeekType, WeekSlotsType } from '@/types/slotTypes'
import { useMentorGetSlotsQuery } from '@/hooks/slot'

const daysOfWeek:DayOfWeekType[]= [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

const defaultSlots={
  Monday:[],
  Tuesday:[],
  Wednesday:[],
  Thursday:[],
  Friday:[],
  Saturday:[],
  Sunday:[]
} as WeekSlotsType


const timePeriods={
  Monday:null,
  Tuesday:null,
  Wednesday:null,
  Thursday:null,
  Friday:null,
  Saturday:null,
  Sunday:null
}

function splitTimeRange(startTime: string,endTime: string,intervalMinutes: number = 30): {start:number;end:number,enabled:boolean}[] {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const slots: {start:number;end:number,enabled:boolean}[] = [];
  for (let current = start; current + intervalMinutes <= end; current += intervalMinutes) {
    slots.push({
      start: current,
      end: current + intervalMinutes,
      enabled:true
    });
  }
  return slots;
}


const SlotManage = () => {
  const [slots, setSlots] = useState<WeekSlotsType>(defaultSlots)
  const [activeDay, setActiveDay] = useState<DayOfWeekType>(daysOfWeek[0])
  const [timeRanges,setTimeRanges] = useState<Record<string,{startTime:string,endTime:string}|null>>(timePeriods)
  

  const {data:weekSlots} = useMentorGetSlotsQuery();

  const {mutate:updateSlotMutation}=useMutation({
      mutationFn:updateSlot,
      onSuccess:(response)=>{
        toast.success(response.message)
      },
      onError:(error)=>{
        toast.error(error.message)
      }
  })

  const {mutate:updateSlotStatusMutation}=useMutation({
     mutationFn:updateSlotStatus,
      onSuccess:(response)=>{
        toast.success(response.message)
      },
      onError:(error)=>{
        toast.error(error.message)
      }
  })
  

  useEffect(()=>{
    if(timeRanges[activeDay]){
      const startTime = timeRanges[activeDay].startTime
      const endTime = timeRanges[activeDay].endTime
      const slots = splitTimeRange(startTime,endTime)
      setSlots(prev=>({...prev,[activeDay]:slots}))
    }
  },[timeRanges])

  useEffect(()=>{
    if(weekSlots){
      setSlots(weekSlots)
    }
  },[weekSlots])

  
  const handleToggle = (day:DayOfWeekType,idx:number,slotId:string,slotStatus:boolean) => {
    console.log(slotId)
    updateSlotStatusMutation({day,slotId,slotStatus});

    setSlots(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) => i === idx ? { ...slot, enabled: !slot.enabled } : slot)
    }))
  }
  const handleSlotCreation=()=>{
      updateSlotMutation(slots)
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Slot Management</h1>
        <Card  className="p-6 mb-8">
          <div className="flex justify-center gap-2 flex-wrap">
            {daysOfWeek.map(day => (
              <Button
                key={day}
                variant={activeDay === day ? 'default' : 'outline'}
                className={`rounded-full px-6 py-2 font-semibold ${activeDay === day ? 'bg-[#d90429] text-white' : ''}`}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </Card>
        
        <Card  className="p-6">
          <h2 className="text-lg font-semibold text-[#d90429]">{activeDay} Slots</h2>

           <TimePeriod activeDay={activeDay}  setTimeRanges={setTimeRanges}/>

          <div className="flex flex-col gap-4">
            <ScrollArea className="h-[200px] rounded-md border p-4">
            {slots[activeDay].map((slot, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#222]">{toTimeString(slot.start)} - {toTimeString(slot.end)}</span>
                </div>
                <Switch checked={slot.enabled} onCheckedChange={()=>handleToggle(activeDay,idx,slot._id,!slot.enabled)} />
              </div>
            ))}
            </ScrollArea>
          </div>

        </Card>

        <Button onClick={handleSlotCreation} className='w-full mt-2'>ADD YOUR SLOT</Button>
      </div>
    </div>
  )
}

export default SlotManage
