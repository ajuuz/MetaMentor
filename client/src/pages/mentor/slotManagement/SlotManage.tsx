import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

const defaultSlots = daysOfWeek.reduce((acc, day) => {
  acc[day] = [
    { start: '09:00', end: '10:00', enabled: false },
    { start: '10:00', end: '11:00', enabled: false },
    { start: '11:00', end: '12:00', enabled: false },
    { start: '14:00', end: '15:00', enabled: false },
    { start: '15:00', end: '16:00', enabled: false },
  ];
  return acc;
}, {} as Record<string, { start: string, end: string, enabled: boolean }[]>)

const SlotManage = () => {
  const [slots, setSlots] = useState(defaultSlots)
  const [activeDay, setActiveDay] = useState(daysOfWeek[0])

  const handleToggle = (day: string, idx: number) => {
    setSlots(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) => i === idx ? { ...slot, enabled: !slot.enabled } : slot)
    }))
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">Slot Management</h1>
        <Card className="p-6 mb-8">
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
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 text-[#d90429]">{activeDay} Slots</h2>
          <div className="flex flex-col gap-4">
            {slots[activeDay].map((slot, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white rounded-lg shadow px-4 py-3">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#222]">{slot.start} - {slot.end}</span>
                </div>
                <Switch checked={slot.enabled} onCheckedChange={() => handleToggle(activeDay, idx)} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SlotManage
