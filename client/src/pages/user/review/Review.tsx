import ReviewDetail from '@/components/review/reviewDetailed/ReviewDetail'
import {  useGetReviewForStudentQuery } from '@/hooks/tanstack/review'
import {  useParams } from 'react-router-dom'

const ReviewsPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>()
  console.log(reviewId,"page is comming ")
  const {data:review,error,isLoading:loading}=useGetReviewForStudentQuery(reviewId!)
  
  return (
    <ReviewDetail role='user' review={review!} error={error} loading={loading}/>
  )
}

export default ReviewsPage
