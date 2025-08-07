import { Clock, FileText, MessageSquare, User } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import type { MentorReviewCard } from "@/types/reviewTypes"
import { toTimeString } from "@/utils/helperFunctions/toTimeString"
import { useNavigate } from "react-router-dom"
import { useMemo } from "react"
import AlertDialogComponent from "../common/AlertDialogComponent"
import { useMutation } from "@tanstack/react-query"
import { cancelReviewByMentor } from "@/services/mentorService.ts/reviewApi"
import { toast } from "sonner"
import { queryClient } from "@/config/tanstackConfig/tanstackConfig"


type Props={
    review:MentorReviewCard,
    isNotOver?:boolean
}

const formattedDate =(date:Date)=>new Date(date).toLocaleDateString("en-US", {year: "numeric",month: "long",day: "numeric"});
const statusColorMap: Record<string, string> = {
  pass: 'bg-green-500 text-white',
  fail: 'bg-red-500 text-white',
  cancelled: 'bg-gray-500 text-white',
  pending: 'bg-yellow-500 text-black',
};
const ReviewCard = ({review,isNotOver}:Props) => {

  const navigate = useNavigate()

  const {mutate:cancelReviewMutation,isPending:isLoading}=useMutation({
    mutationFn:cancelReviewByMentor,
    onSuccess:(response)=>{
      toast.success(response.message)
       queryClient.invalidateQueries({queryKey:['getReviewsForMentor']})
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
  const handleCancelReview=()=>{
    const reviewId=review._id
    const status='cancelled'
    cancelReviewMutation({reviewId,status})
  }


   let isCancelAvailable;
   if(isNotOver){
     const isCancelAvailableChecker= () => {
       if (!isNotOver || !review.slot?.isoStartTime) return false;
       const currentDate = new Date();
       const startTime = new Date(review.slot.isoStartTime); // assuming isoStartTime is ISO string
       const diffInMs = startTime.getTime() - currentDate.getTime(); // milliseconds
       const diffInHours = diffInMs / (1000 * 60 * 60); // convert to hours
       return diffInHours >= 2;
      }
      isCancelAvailable=isCancelAvailableChecker()
    }

  return (
     <div className=" max-w-6xl border rounded-lg bg-white shadow flex gap-2 ">
            <div className="flex flex-col justify-center items-center gap-4 py-3 flex-1 rounded-l-md bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Student</span>
                </div>
                <Avatar className="w-20 h-20 border-4 border-white/20 shadow-2xl">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      {review.student.name[0]}
                    </AvatarFallback>
                  </Avatar>
                <p className="text-lg font-medium font-serif text-white">{review.student.name || 'Student'}</p>
                <Button onClick={()=>navigate(`/mentor/reviews/${review._id}`)} className="bg-gradient-to-br from-blue-500 to-purple-600 px-9">View</Button>
            </div>

        <div className="flex-2 flex p-5 gap-3">
            <div className="flex-1 px-5 flex flex-col justify-center items-center gap-2  rounded shadow-[inset_0_0_16px_1px_rgba(0,0,0,0.1)]">
              <div className="flex flex-col gap-2  items-center w-full">
                <div className="flex  items-center w-full">
                  <div className="flex-1 text-lg font-semibold bg-black h-full rounded-l-md text-white flex items-center px-2">Domain</div>
                  <Badge variant="secondary" className="flex-1 text-lg px-4 py-2 bg-blue-50 text-blue-700 border-blue-200 rounded-l-none">
                    {review.domainName}
                  </Badge>
                </div>
                <div className="flex items-center w-full">
                  <div className="flex-1 justify-center text-lg font-semibold bg-black h-full rounded-l-md text-white flex items-center px-2">Level</div>
                  <Badge variant="outline" className="flex-1 text-lg px-4 py-2 border-green-200 text-green-700">
                    {review.level.name}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                    <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800">
                      <FileText className="w-4 h-4" />
                      Task File
                    </Button>
                    {review.status!=='pending' &&
                    <Button
                    size="sm"
                    variant="outline"
                    className="gap-2 border-slate-300 hover:bg-slate-50 bg-transparent"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Feedback
                    </Button>
                    }
                </div>

                <div className="flex gap-3">
                    <Badge className={`p-2 px-5 ${statusColorMap[review.status]}`}>{review.status}</Badge>
                    {isCancelAvailable && <AlertDialogComponent alertTriggerer={<Button disabled={isLoading}>Cancel</Button>} alertDescription="Are you sure you are going to cancel the reivew" handleClick={handleCancelReview}/>}
                </div>
            </div>

            <div className="flex-1  flex flex-col  justify-center items-center  rounded shadow-[inset_0_0_16px_1px_rgba(0,0,0,0.1)] p-2">
                <div className=" flex flex-col gap-2 w-full">
                      <div className="flex justify-between bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <p className="text-lg font-semibold text-slate-500 mb-1">Date</p>
                        <p className="text-lg font-semibold text-slate-900">{formattedDate(review.slot.isoStartTime)}</p>
                      </div>

                      <div className="flex justify-between bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <p className="text-lg font-semibold text-slate-500 mb-1">Day</p>
                        <p className="text-lg font-semibold text-slate-900">{review.slot.day}</p>
                      </div>

                      <div className="flex justify-between  bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 justify-center mb-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <p className="text-lg font-semibold text-slate-500">Duration</p>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">{toTimeString(review.slot.start)} - {toTimeString(review.slot.end)}</p>
                      </div>
                    </div>
            </div>      
        </div>
        </div>
  )
}

export default ReviewCard
