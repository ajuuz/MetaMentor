"use client"

import { Clock, FileText, MessageSquare, User } from "lucide-react"
import type { PopulatedReviewEntity } from "@/types/reviewTypes"
import {
  getDayFromISO,
  getFormattedDayWithMonthAndYear,
  isoStringToLocalTime,
} from "@/utils/helperFunctions/toTimeString"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ContentViewerModal from "@/components/common/ContentViewerModal"
import AlertDialogComponent from "@/components/common/AlertDialogComponent"
import StudentRescheduleSheet from "../reschedule/StudentRescheduleSheet"
import { useState } from "react"

type Props = {
  review: PopulatedReviewEntity
  isNotOver?: boolean
  handleCancelReview: (reviewId: string) => void
  isLoading: boolean
}

const statusColorMap: Record<string, string> = {
  pass: "bg-green-500 text-white",
  fail: "bg-red-500 text-white",
  cancelled: "bg-gray-500 text-white",
  pending: "bg-blue-500 text-white",
}

const StudentReviewCard = ({ review, isNotOver, handleCancelReview, isLoading }: Props) => {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  let isCancelOrRescheduleAllowed
  if (isNotOver) {
    const checker = () => {
      if (!isNotOver || !review?.slot?.start) return false

      const currentDate = new Date()
      const startTime = new Date(review.slot.start)
      const diffInDays = (startTime.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)

      console.log("Difference in days:", diffInDays)

      return diffInDays >= 2
    }

    isCancelOrRescheduleAllowed = checker()
  }

  const start = isoStringToLocalTime(review.slot.start)
  const end = isoStringToLocalTime(review.slot.end)
  const day = getDayFromISO(review.slot.start)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      {sheetOpen && (
        <StudentRescheduleSheet
          mentorId={review.otherAttendee._id}
          reviewId={review._id}
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
        />
      )}
      <div className="border rounded-lg bg-white shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Left Section - Mentor Info */}
        <div className="flex flex-col justify-center items-center gap-4 py-6 md:py-8 px-4 md:px-6 rounded-l-md bg-gradient-to-br from-red-50 to-red-100 border-b md:border-b-0 md:border-r border-red-200">
          <div className="flex items-center gap-2 text-red-600">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Mentor</span>
          </div>
          <Avatar className="w-16 md:w-20 h-16 md:h-20 border-4 border-white shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-red-400 to-red-500 text-white text-xl md:text-2xl font-bold">
              {review.otherAttendee.name[0]}
            </AvatarFallback>
          </Avatar>
          <p className="text-base md:text-lg font-semibold text-gray-800 text-center">
            {review.otherAttendee.name || "Mentor"}
          </p>
          <Button
            onClick={() => navigate(`/reviews/${review._id}`)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 md:px-8 w-full md:w-auto"
          >
            View
          </Button>
        </div>

        {/* Middle Section - Details */}
        <div className="flex flex-col justify-center items-center gap-4 p-4 md:p-6 border-b md:border-b-0 md:border-r border-red-100">
          <div className="w-full space-y-3">
            {/* Domain */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
              <div className="text-sm md:text-base font-semibold bg-red-500 text-white rounded px-3 py-2 whitespace-nowrap">
                Domain
              </div>
              <Badge className="flex-1 text-sm md:text-base px-3 py-2 bg-red-50 text-red-700 border border-red-200">
                {review.domainName}
              </Badge>
            </div>

            {/* Level */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
              <div className="text-sm md:text-base font-semibold bg-red-500 text-white rounded px-3 py-2 whitespace-nowrap">
                Level
              </div>
              <Badge className="flex-1 text-sm md:text-base px-3 py-2 border border-red-200 text-red-700 bg-white">
                {review.level.name}
              </Badge>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <ContentViewerModal
                triggerer={
                  <Button size="sm" className="gap-2 bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto">
                    <FileText className="w-4 h-4" />
                    Task File
                  </Button>
                }
                title="Task File"
                description="Task File"
                content={review.level.taskFile}
              />

              {review.status !== "pending" && (
                <ContentViewerModal
                  triggerer={
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-red-300 hover:bg-red-50 bg-white text-red-600 w-full sm:w-auto"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Feedback
                    </Button>
                  }
                  title="Feedback"
                  description="Feedback"
                  content={review.feedBack}
                />
              )}
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col gap-3 pt-3 border-t border-red-100">
              <Badge className={`p-2 px-4 text-sm md:text-base w-fit ${statusColorMap[review.status]}`}>
                {review.status}
              </Badge>

              {isCancelOrRescheduleAllowed && (
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <AlertDialogComponent
                    alertTriggerer={
                      <Button disabled={isLoading} variant="destructive" size="sm" className="w-full sm:w-auto">
                        Cancel
                      </Button>
                    }
                    alertDescription="Are you sure you want to cancel this review?"
                    handleClick={() => handleCancelReview(review._id)}
                  />
                  {!review.isRescheduledOnce && (
                    <Button
                      onClick={() => setSheetOpen(true)}
                      className="bg-red-500 hover:bg-red-600 text-white w-full sm:w-auto"
                      size="sm"
                    >
                      Reschedule
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Payment Info */}
            {review.payment && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-2 border-t border-red-100">
                <Badge variant="outline" className="text-xs md:text-sm border-red-200 text-red-700">
                  Payment: {review.payment.method.toUpperCase()}
                </Badge>
                <Badge
                  variant={review.payment.status === "success" ? "default" : "secondary"}
                  className="text-xs md:text-sm"
                >
                  {review.payment.status}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Schedule Info */}
        <div className="flex flex-col justify-center items-center p-4 md:p-6">
          <div className="w-full space-y-3">
            {/* Date */}
            <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-white rounded-lg p-3 md:p-4 border border-red-100">
              <p className="text-sm md:text-base font-semibold text-red-600">Date</p>
              <p className="text-sm md:text-base font-semibold text-gray-800">
                {getFormattedDayWithMonthAndYear(review.slot.start)}
              </p>
            </div>

            {/* Day */}
            <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-white rounded-lg p-3 md:p-4 border border-red-100">
              <p className="text-sm md:text-base font-semibold text-red-600">Day</p>
              <p className="text-sm md:text-base font-semibold text-gray-800">{day}</p>
            </div>

            {/* Duration */}
            <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-white rounded-lg p-3 md:p-4 border border-red-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-600" />
                <p className="text-sm md:text-base font-semibold text-red-600">Duration</p>
              </div>
              <p className="text-sm md:text-base font-semibold text-gray-800">
                {start} - {end}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentReviewCard
