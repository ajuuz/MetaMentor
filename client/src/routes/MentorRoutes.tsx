import MentorDetailsManage from "@/pages/common/mentorDetailsManage/MentorDetailsManage"
import { Route, Routes } from "react-router-dom"
import MentorApplicationProctedRoute from "./protectedRoutes/MentorApplicationProctedRoute"

const MentorRoutes = () => {
  return (
   <Routes>
    <Route path='/register' element={<MentorApplicationProctedRoute><MentorDetailsManage/></MentorApplicationProctedRoute>}/>
   </Routes>
  )
}

export default MentorRoutes
