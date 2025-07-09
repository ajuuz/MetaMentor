import MentorDetailsManage from "@/pages/common/mentorDetailsManage/MentorDetailsManage"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"
import Dashboard from "@/pages/mentor/dashboard/Dashboard"
import SlotManage from "@/pages/mentor/slotManagement/SlotManage"
import MentorLayout from "@/layouts/MentorLayout"

const MentorRoutes = () => {
  return (
   <Routes>
      <Route element={<ProtectedRoute allowedRoles={['user']} navitageTo="/admin/dashboard"/>}>
         <Route path='/register' element={<MentorDetailsManage/>}/>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['mentor']} />}>
         <Route element={<MentorLayout/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/slots' element={<SlotManage/>}/>
         </Route>
      </Route>

   </Routes>
  )
}

export default MentorRoutes
