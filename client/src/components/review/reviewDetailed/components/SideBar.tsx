import ContentViewerModal from "@/components/common/ContentViewerModal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type {  PopulatedReviewEntity } from "@/types/reviewTypes"
import { REVIEW_STATUS, type ROLES } from "@/utils/constants"
import {  getDayFromISO, getFormattedDayWithMonthAndYear, isoStringToLocalTime } from "@/utils/helperFunctions/toTimeString"
import { Separator } from "@radix-ui/react-select"
import { Calendar, Clock, FileText, MessageSquare, User } from "lucide-react"


type Props = {
  role:Exclude<ROLES,'admin'>
  review: PopulatedReviewEntity
}


const SideBar = ({role,review }: Props) => {

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
      <Card className="h-fit overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0 h-full grid grid-cols-2 items-center justify-center">
          {/* Student Info */}

          <div className="h-full flex-1">
            <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{role==='mentor'?"Student":"Mentor"}</span>
                </div>
                <Avatar className="w-16 h-16 border-4 border-white/20 shadow-2xl">
                  <AvatarImage src={review.otherAttendee.profileImage || "/placeholder.svg"} alt={review.otherAttendee.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                    {review.otherAttendee.name[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold text-center">{review.otherAttendee.name}</h2>
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
                  {review?.domainName?.length > 15 ? review?.domainName.slice(0, 15) + "..." : review?.domainName}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-slate-600">Level</span>
                </div>
                <Badge variant="outline" className="w-full justify-center py-2 border-green-200 text-green-700">
                  {review?.level?.name?.length > 15 ? review?.level?.name.slice(0, 15) + "..." : review?.level?.name}
                </Badge>
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <ContentViewerModal
                  triggerer={<Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800">
                    <FileText className="w-4 h-4" />
                    Task File
                  </Button>}
                  title="Task File"
                  description="Task File"
                  content={review.level.taskFile}
                />

                {review.feedBack && (
                  <ContentViewerModal
                    triggerer={<Button size="sm" variant="outline" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Feedback
                    </Button>}
                    title="Feedback"
                    description="Feedback"
                    content={review.feedBack}
                  />
                )}
              </div>
            </div>
          </div>


          {/* Schedule Info */}
          <div className="flex-1 h-full">
            <div className="p-6  space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-slate-600" />
                <span className="text-sm font-medium text-slate-600">Schedule</span>
              </div>

              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Date</p>
                  <p className="text-sm font-semibold text-slate-900">{getFormattedDayWithMonthAndYear(review.slot.start)}</p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Day</p>
                  <p className="text-sm font-semibold text-slate-900">{getDayFromISO(review.slot.start)}</p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <p className="text-xs text-slate-500">Time</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    {isoStringToLocalTime(review.slot.start)} - {isoStringToLocalTime(review.slot.end)}
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">Status</p>
                  {getStatusBadge()}
                </div>
              </div>
            </div>
            {
              review.status !== REVIEW_STATUS.PENDING &&
              <div className="px-5">
                <div className={`text-gray-600 bg-blue-100 p-4 shadow-md shadow-emerald-200 rounded-lg ${review.status === "pass" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                  <h4 className="font-semibold text-center">Mark</h4>
                  <div className="flex justify-between gap-3">
                    <div className={`bg-blue-50 p-1 border-2 px-2 rounded ${review.status === "pass" ? "border-emerald-400/70 bg-emerald-50 text-emerald-700" : "border-red-400/70 bg-red-50 text-red-700"}`}>Theory:{review.theory}</div>
                    <div className={`bg-blue-50 p-1 border-2 px-2 rounded ${review.status === "pass" ? "border-emerald-400/70 bg-emerald-50 text-emerald-700" : "border-red-400/70 bg-red-50 text-red-700"}`}>Pratical:{review.practical}</div>
                  </div>
                </div>
              </div>
            }
          </div>

        </CardContent>
      </Card>
  )
}

export default SideBar
