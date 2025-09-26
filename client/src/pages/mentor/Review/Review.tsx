import ReviewDetail from '@/components/review/reviewDetailed/ReviewDetail'
import { useGetReviewForMentorQuery } from '@/hooks/tanstack/review'
import { useParams } from 'react-router-dom'

const ReviewPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>()
  const {data:review,error,isLoading:loading}=useGetReviewForMentorQuery(reviewId!)
  
  return (
    <ReviewDetail role='mentor' review={review!} error={error} loading={loading}/>
  )
}

export default ReviewPage
