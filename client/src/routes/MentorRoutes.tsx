import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"
import Dashboard from "@/pages/mentor/dashboard/Dashboard"
import SlotManage from "@/pages/mentor/slotManagement/SlotManage"
import MentorLayout from "@/layouts/MentorLayout"
import CompletedReviews from "@/pages/mentor/Reviews/Completed"
import UpcomingReviews from "@/pages/mentor/Reviews/Upcoming"
import ReviewPage from "@/pages/mentor/Review/Review"
import Profile from "@/pages/mentor/profile/Profile"

const MentorRoutes = () => {
  return (
   <Routes>
      <Route element={<ProtectedRoute allowedRoles={['mentor']} />}>
         <Route element={<MentorLayout/>}>
            <Route path='/' element={<Profile/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/reviews/upcoming' element={<UpcomingReviews/>}/>
            <Route path='/reviews/completed' element={<CompletedReviews/>}/>
            <Route path='/slots' element={<SlotManage/>}/>
         </Route>
         <Route path='/reviews/:reviewId' element={<ReviewPage/>}/>
      </Route>

   </Routes>
  )
}

export default MentorRoutes
