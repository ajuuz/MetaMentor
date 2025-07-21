import React, { useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"; 
import { toMinutes } from "@/utils/helperFunctions/convertToMinutes";

const generateTimeOptions = () => {
  const times = [];
  for (let mins = 0; mins < 1440; mins += 15) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const period = h < 12 ? "AM" : "PM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const formatted = `${hour12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${period}`;
    times.push(formatted);
  }
  return times;
};


type Props={
    activeDay:string,
    setTimeRanges:React.Dispatch<React.SetStateAction<Record<string,{startTime:string,endTime:string}|null>>>
}

const TimePeriod = ({activeDay,setTimeRanges}:Props) => {
  const timeOptions = useMemo(generateTimeOptions,[])

  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateSlot = () => {
    if (!startTime || !endTime) {
      setError("Please select both start and end time.");
      return;
    }

    const start = toMinutes(startTime);
    const end = toMinutes(endTime);

    if (end <= start) {
      setError("End time must be after start time.");
    } else if (end - start < 30) {
      setError("Slot must be at least 30 minutes.");
    } else {
      setError("");
      setStartTime('')
      setEndTime('')
      setTimeRanges(prev=>({...prev,[activeDay]:{startTime,endTime}}))
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center">
        <div>
          <label>Start Time</label>
          <Select value={startTime} onValueChange={setStartTime}>
            <SelectTrigger  className="w-[180px] cursor-pointer">
              <SelectValue  placeholder="Start time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time, idx) => (
                <SelectItem key={idx} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>End Time</label>
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger className="w-[180px] cursor-pointer">
              <SelectValue placeholder="End time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time, idx) => (
                <SelectItem key={idx} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && <p className="text-red-600 text-center">{error}</p>}

    <div className="flex justify-center">
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={validateSlot}
        >
        Create Slot
      </button>
    </div>
    </div>
  );
};

export default TimePeriod;
