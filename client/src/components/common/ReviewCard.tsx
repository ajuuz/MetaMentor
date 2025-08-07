import { Clock, FileText, MessageSquare, User } from 'lucide-react'
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import type { GetStudentReviewResponseDTO } from "@/types/reviewTypes"
import { toTimeString } from "@/utils/helperFunctions/toTimeString"
import { useNavigate } from "react-router-dom"
import AlertDialogComponent from "../common/AlertDialogComponent"
// import { cancelReviewByStudent } from "@/services/studentService/reviewApi"

type Props = {
  review: GetStudentReviewResponseDTO,
  isNotOver?: boolean
}

const formattedDate = (date: Date) => new Date(date).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

const statusColorMap: Record<string, string> = {
  pass: 'bg-green-500 text-white',
  fail: 'bg-red-500 text-white',
  cancelled: 'bg-gray-500 text-white',
  pending: 'bg-blue-500 text-white',
};

const StudentReviewCard = ({ review, isNotOver }: Props) => {
  console.log(review)
  const navigate = useNavigate()
  
  // const { mutate: cancelReviewMutation, isPending: isLoading } = useMutation({
  //   mutationFn: cancelReviewByStudent,
  //   onSuccess: (response) => {
  //     toast.success(response.message)
  //     queryClient.invalidateQueries({ queryKey: ['getReviewsForStudent'] })
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   }
  // })

  const handleCancelReview = () => {
    const reviewId = review._id
    const status = 'cancelled'
    // cancelReviewMutation({ reviewId, status })
  }

  let isCancelAvailable;
  if (isNotOver) {
    const isCancelAvailableChecker = () => {
      if (!isNotOver || !review.slot?.isoStartTime) return false;
      const currentDate = new Date();
      const startTime = new Date(review.slot.isoStartTime);
      const diffInMs = startTime.getTime() - currentDate.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);
      return diffInHours >= 2;
    }
    isCancelAvailable = isCancelAvailableChecker()
  }

  return (
    <div className="w-5xl border rounded-lg bg-white shadow flex gap-2">
      <div className="flex flex-col justify-center items-center gap-4 py-3 flex-1 rounded-l-md bg-gradient-to-br from-emerald-900 to-teal-800">
        <div className="flex items-center gap-2 text-emerald-300">
          <User className="w-4 h-4" />
          <span className="text-sm">Mentor</span>
        </div>
        <Avatar className="w-20 h-20 border-4 border-white/20 shadow-2xl">
          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-2xl font-bold">
            {review.mentor.name[0]}
          </AvatarFallback>
        </Avatar>
        <p className="text-lg font-medium font-serif text-white">{review.mentor.name || 'Mentor'}</p>
        <Button 
          onClick={() => navigate(`/student/reviews/${review._id}`)} 
          className="bg-gradient-to-br from-emerald-500 to-teal-600 px-9 hover:from-emerald-600 hover:to-teal-700"
        >
          View
        </Button>
      </div>

      <div className="flex-2 flex p-5 gap-3">
        <div className="flex-1 px-5 flex flex-col justify-center items-center gap-2 rounded shadow-[inset_0_0_16px_1px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col gap-2 items-center w-full">
            <div className="flex items-center w-full">
              <div className="flex-1 text-lg font-semibold bg-emerald-800 h-full rounded-l-md text-white flex items-center px-2">
                Domain
              </div>
              <Badge variant="secondary" className="flex-1 text-lg px-4 py-2 bg-emerald-50 text-emerald-700 border-emerald-200 rounded-l-none">
                {review.domainName}
              </Badge>
            </div>
            <div className="flex items-center w-full">
              <div className="flex-1 justify-center text-lg font-semibold bg-emerald-800 h-full rounded-l-md text-white flex items-center px-2">
                Level
              </div>
              <Badge variant="outline" className="flex-1 text-lg px-4 py-2 border-teal-200 text-teal-700">
                {review.level.name}
              </Badge>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" className="gap-2 bg-emerald-800 hover:bg-emerald-700">
              <FileText className="w-4 h-4" />
              Task File
            </Button>
            {review.status !== 'pending' && (
              <Button
                size="sm"
                variant="outline"
                className="gap-2 border-emerald-300 hover:bg-emerald-50 bg-transparent text-emerald-700"
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Button>
            )}
          </div>

          <div className="flex gap-3 items-center">
            <Badge className={`p-2 px-5 ${statusColorMap[review.status]}`}>
              {review.status}
            </Badge>
            {isCancelAvailable && (
              <AlertDialogComponent 
                alertTriggerer={
                  <Button 
                    // disabled={isLoading} 
                    variant="destructive" 
                    size="sm"
                  >
                    Cancel
                  </Button>
                } 
                alertDescription="Are you sure you want to cancel this review?" 
                handleClick={handleCancelReview}
              />
            )}
          </div>

          {review.payment && (
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-sm">
                Payment: {review.payment.method.toUpperCase()}
              </Badge>
              <Badge 
                variant={review.payment.status === 'success' ? 'default' : 'secondary'}
                className="text-sm"
              >
                {review.payment.status}
              </Badge>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center items-center rounded shadow-[inset_0_0_16px_1px_rgba(0,0,0,0.1)] p-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 shadow-sm border border-emerald-100">
              <p className="text-lg font-semibold text-emerald-600 mb-1">Date</p>
              <p className="text-lg font-semibold text-emerald-900">{formattedDate(review.slot.isoStartTime)}</p>
            </div>
            <div className="flex justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 shadow-sm border border-emerald-100">
              <p className="text-lg font-semibold text-emerald-600 mb-1">Day</p>
              <p className="text-lg font-semibold text-emerald-900">{review.slot.day}</p>
            </div>
            <div className="flex justify-between bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 shadow-sm border border-emerald-100">
              <div className="flex items-center gap-2 justify-center mb-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <p className="text-lg font-semibold text-emerald-600">Duration</p>
              </div>
              <p className="text-lg font-semibold text-emerald-900">
                {toTimeString(review.slot.start)} - {toTimeString(review.slot.end)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentReviewCard
