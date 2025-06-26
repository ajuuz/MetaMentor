import MentorDetailsManage from "@/pages/common/mentorDetailsManage/MentorDetailsManage"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"

const MentorRoutes = () => {
  return (
   <Routes>
      <Route element={<ProtectedRoute allowedRoles={['user']} navitageTo="/admin/dashboard"/>}>
         <Route path='/register' element={<MentorDetailsManage/>}/>
      </Route>

   </Routes>
  )
}

export default MentorRoutes
