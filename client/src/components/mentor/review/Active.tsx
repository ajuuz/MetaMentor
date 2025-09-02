import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isoStringToLocalTime } from '@/utils/helperFunctions/toTimeString'
import { MessageSquare, Video } from 'lucide-react'

type Props={
    end:string,
    now:Date
}
const Active = ({end,now}:Props) => {
  const endTime=new Date(end);
  return (
     <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                <Video className="w-6 h-6" />
                Review Session Active
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-full max-w-2xl aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
                <div className="relative z-10 text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video call will appear here</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2">
                  <Video className="w-5 h-5" />
                  Join Call
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Chat
                </Button>
              </div>

              <div className="text-center text-sm text-slate-600">
                <p>Session ends at {isoStringToLocalTime(end)}</p>
                <p className="text-xs mt-1">
                  Time remaining: {Math.floor((endTime.getTime() - now.getTime()) / (1000 * 60))} minutes
                </p>
              </div>
            </CardContent>
          </Card>
  )
}

export default Active
