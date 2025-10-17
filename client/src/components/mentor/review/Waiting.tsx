import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getFormattedDayWithMonthAndYear,
  isoStringToLocalTime,
} from "@/utils/helperFunctions/toTimeString";
import { Calendar, Clock, Timer, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  reviewId:string
  start: string;
  now: Date;
};
const Waiting = ({ reviewId,start,now }: Props) => {
  const navigate=useNavigate()
  const startTime= new Date(start)

  const getTimeUntilStart = () => {
    const diff = startTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    return "Starting soon...";
  };

  const isJoinButtonDisabled=():boolean=>{
    const diff=startTime.getTime()-now.getTime();
    return diff >= (15 * 60 * 1000)
  }
  return (
    <Card className="h-full">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-blue-600">
          <Timer className="w-6 h-6" />
          Waiting to Join
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <Clock className="w-16 h-16 text-blue-600" />
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">
            Review Not Started Yet
          </h3>
          <p className="text-slate-600 mb-4">
            Your review session will begin in{" "}
            <span className="font-semibold text-blue-600">
              {getTimeUntilStart()}
            </span>
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 w-full max-w-md text-center">
          <Calendar className="w-8 h-8 mx-auto mb-3 text-blue-600" />
          <p className="text-sm text-slate-700 mb-2">Scheduled for:</p>
          <p className="font-semibold text-slate-900">
            {getFormattedDayWithMonthAndYear(start)} at{" "}
            {isoStringToLocalTime(start)}
          </p>
        </div>

        <Button onClick={()=>navigate(`/call/${reviewId}`)} disabled={isJoinButtonDisabled()} className="gap-2">
          <Video className="w-5 h-5" />
          Join Call (Not Available Yet)
        </Button>
      </CardContent>
    </Card>
  );
};

export default Waiting;
