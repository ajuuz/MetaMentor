import {  Loader2 } from 'lucide-react'
import { Card, CardContent} from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useGetReviewForMentorQuery } from '@/hooks/tanstack/review'
import SideBar from '@/components/mentor/review/SideBar'
import Active from '@/components/mentor/review/Active'
import Waiting from '@/components/mentor/review/Waiting'
import Completed from '@/components/mentor/review/Completed'


const ReviewPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>()
  const [currentTime, setCurrentTime] = useState(new Date())
  const {data:review,error,isLoading:loading}=useGetReviewForMentorQuery(reviewId!)
  
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Loading Review</h3>
            <p className="text-slate-600 text-center">Please wait while we fetch the review details...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="w-96">
          <CardContent className="p-8">
            <Alert variant="destructive">
              <AlertDescription>
                {error?.message || 'Review not found'}
              </AlertDescription>
            </Alert>
            <div className="mt-6 text-center">
              <Button onClick={() => window.history.back()} variant="outline">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const startTime = new Date(review.slot.isoStartTime)
  const endTime = new Date(review.slot.isoEndTime)
  const now = currentTime

  const getReviewStatus = () => {
    if (review.status === 'cancelled' || review.status === 'pass' || review.status === 'fail') {
      return 'completed'
    }
    
    if (review.status === 'pending') {
      if (now >= startTime && now <= endTime) {
        return 'active' 
      } else if (now < startTime) {
        return 'waiting' 
      } else {
        return 'completed' 
      }
    }
    
    return 'completed'
  }


  const status = getReviewStatus()

  const renderMainContent = () => {
    switch (status) {
      case 'active':
        return (
          <Active end={review.slot.end} endTime={endTime} now={now}/>
        )

      case 'waiting':
        return (
          <Waiting start={review.slot.start} now={now} startTime={startTime}/>
        )

      case 'completed':
        return (
          <Completed review={review} startTime={startTime} endTime={endTime}/>
        )

      default:
        return null
    }
  }

  return (
    <div className=" p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-3rem)] relative">

          {/* Left Sidebar - Student Details */}
          <div className="lg:col-span-2">
          <Button className='w-full' onClick={() => navigate(-1)} variant="outline">Back</Button>
          <SideBar review={review}/>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
