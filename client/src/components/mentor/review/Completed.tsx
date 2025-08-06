import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { MentorReviewCard } from '@/types/reviewTypes'
import { formattedIsoDate, toTimeString } from '@/utils/helperFunctions/toTimeString'
import { AnimatePresence } from 'framer-motion'
import { Award, CheckCircle, FileText, X, XCircle } from 'lucide-react'
import {motion} from 'framer-motion'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { REVIEW_STATUS, type ReviewStatus } from '@/utils/constants'
import LoadingSpinnerComponent from '@/components/common/LoadingSpinnerComponent'
import { useMutation } from '@tanstack/react-query'
import { updateReviewStatus } from '@/services/mentorService.ts/reviewApi'
import { toast } from 'sonner'

type Props={
    review:MentorReviewCard,
    startTime:Date
    endTime:Date
}
const Completed = ({review,startTime,endTime}:Props) => {

    const [feedBackPopupToggle,setFeedBackPopupToggle]=useState<boolean>(false)
    const [feedBack,setFeedBack]=useState<string>('');
    const [feedBackError,setFeedBackError]=useState<string>('');


    const {mutate:submitFeedBackMutation,isPending:isLoading}=useMutation({
        mutationFn:updateReviewStatus,
        onSuccess:(response)=>{
            toast.success(response.message)
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    const getCompletedIcon = () => {
     switch (review.status) {
       case 'pass':
         return <Award className="w-16 h-16 text-green-600" />
       case 'fail':
         return <XCircle className="w-16 h-16 text-red-600" />
       case 'cancelled':
         return <XCircle className="w-16 h-16 text-gray-600" />
       default:
         return <CheckCircle className="w-16 h-16 text-green-600" />
     }
    }

    const getCompletedTitle = () => {
      switch (review.status) {
        case 'pass':
          return 'Review Passed!'
        case 'fail':
          return 'Review Failed'
        case 'cancelled':
          return 'Review Cancelled'
        default:
          return 'Review Completed'
      }
    }

    const getCompletedColor = () => {
      switch (review.status) {
        case 'pass':
          return 'from-green-100 to-green-200'
        case 'fail':
          return 'from-red-100 to-red-200'
        case 'cancelled':
          return 'from-gray-100 to-gray-200'
        default:
          return 'from-green-100 to-green-200'
      }
    }

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

  const handleSubmitFeedBack=(status:Exclude<ReviewStatus,'cancelled'|'pending'>)=>{
        const isValid=/^(?=.*[a-zA-Z])[a-zA-Z0-9 ]{6,}$/.test(feedBack)
        if(!isValid) {
          setFeedBackError("Reason should have more than 5 alphabets");
          return
        };
        submitFeedBackMutation({reviewId:review._id,status})
    }

  return (
      <Card className="h-full">
        <AnimatePresence>
                  {feedBackPopupToggle &&
                    <motion.div
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 0.4 }}
                    className=" w-[70%]  fixed  bg-black/90 rounded-lg  shadow-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center">
                    <div className="w-[70%] p-5 flex flex-col gap-4 items-center">
                      <X onClick={()=>setFeedBackPopupToggle(false)} strokeWidth={3} className="absolute right-2 top-2 bg-black text-white rounded-3xl p-1 "/>
                      <Label className="text-center font-bold text-white">FEED BACK</Label>
                      <Textarea onChange={(e)=>setFeedBack(e.target.value)} className="border-2 bg-white min-h-50" placeholder="Enter your feedback here..."/>
                      <p className="text-red-300">{feedBackError}</p>
                      <div className='flex justify-center gap-5'>
                        <Button disabled={isLoading} className="w-full bg-green-500 hover:bg-gradient-to-r from-green-500 to-green-700 cursor-pointer" onClick={()=>handleSubmitFeedBack(REVIEW_STATUS.PASS)}>{isLoading?<LoadingSpinnerComponent/>:"PASS"}</Button>
                        <Button disabled={isLoading} className="w-full bg-red-500 hover:bg-gradient-to-r from-red-500 to-red-700 cursor-pointer" onClick={()=>handleSubmitFeedBack(REVIEW_STATUS.FAIL)}>{isLoading?<LoadingSpinnerComponent/>:"FAIL"}</Button>
                      </div>
                    </div>
                  </motion.div>
                  }
        </AnimatePresence>


            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                {getCompletedTitle()}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="text-center">
                <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${getCompletedColor()} flex items-center justify-center`}>
                  {getCompletedIcon()}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">{getCompletedTitle()}</h3>
                <p className="text-slate-600 mb-4">
                  This review session ended on {formattedIsoDate(endTime)} at {toTimeString(review.slot.end)}
                </p>
                {getStatusBadge()}
              </div>

              <div className="bg-slate-50 rounded-lg p-6 w-full max-w-md">
                <h4 className="font-semibold text-slate-800 mb-3">Session Summary</h4>
                <div className="space-y-2 text-sm text-slate-700">
                  <p>• Duration: {Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60))} minutes</p>
                  <p>• Student: {review.student.name}</p>
                  <p>• Domain: {review.domainName}</p>
                  <p>• Level: {review.level.name}</p>
                  <p>• Payment: {review.payment.status} ({review.payment.method})</p>
                </div>
              </div>

              <div className="flex gap-3">
                {
                  review.status==='pending'
                  ?<Button onClick={()=>setFeedBackPopupToggle(true)} variant="outline" className="gap-2">
                    <FileText className="w-5 h-5" />
                    Add Feedback
                  </Button>
                  :<Button variant="outline" className="gap-2">
                    <FileText className="w-5 h-5" />
                    View Feedback
                  </Button>
                }
              </div>
            </CardContent>
          </Card>
  )
}

export default Completed
