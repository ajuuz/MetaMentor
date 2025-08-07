import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { MentorReviewCard } from "@/types/reviewTypes"
import { formattedIsoDate, toTimeString } from "@/utils/helperFunctions/toTimeString"
import { Separator } from "@radix-ui/react-select"
import { Calendar, Clock, FileText, MessageSquare, User } from "lucide-react"


type Props={
    review:MentorReviewCard
}


const SideBar = ({review}:Props) => {

    const getStatusBadge = () => {
    switch (review.status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Passed</Badge>
      case 'fail':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
      case 'cancelled':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Cancelled</Badge>
      default:
        return null
    }
  }
  
  return (
    <div className="lg:col-span-1">
            <Card className="h-full overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0 h-full">
                {/* Student Info */}
                <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-300">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Student</span>
                    </div>
                    <Avatar className="w-16 h-16 border-4 border-white/20 shadow-2xl">
                      <AvatarImage src={review.student.profileImage || "/placeholder.svg"} alt={review.student.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                        {review.student.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-center">{review.student.name}</h2>
                  </div>
                </div>

                {/* Domain & Level */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-slate-600">Domain</span>
                    </div>
                    <Badge variant="secondary" className="w-full justify-center py-2 bg-blue-50 text-blue-700 border-blue-200">
                      {review.domainName}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-slate-600">Level</span>
                    </div>
                    <Badge variant="outline" className="w-full justify-center py-2 border-green-200 text-green-700">
                      {review.level.name}
                    </Badge>
                  </div>

                  <div className="flex flex-col gap-2 pt-4">
                    <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800">
                      <FileText className="w-4 h-4" />
                      Task File
                    </Button>
                    {review.feedBack && (
                      <Button size="sm" variant="outline" className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Feedback
                      </Button>
                    )}
                  </div>
                </div>

                {/* Schedule Info */}
                <div className="p-6 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-slate-600" />
                    <span className="text-sm font-medium text-slate-600">Schedule</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Date</p>
                      <p className="text-sm font-semibold text-slate-900">{formattedIsoDate(review.slot.isoStartTime)}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Day</p>
                      <p className="text-sm font-semibold text-slate-900">{review.slot.day}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <p className="text-xs text-slate-500">Time</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        {toTimeString(review.slot.start)} - {toTimeString(review.slot.end)}
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                      <p className="text-xs text-slate-500 mb-1">Status</p>
                      {getStatusBadge()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
  )
}

export default SideBar
