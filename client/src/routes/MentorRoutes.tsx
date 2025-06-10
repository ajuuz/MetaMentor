import ApplicationForm from "@/pages/mentor/applicationForm/ApplicationForm"
import { Route, Routes } from "react-router-dom"

const MentorRoutes = () => {
  return (
   <Routes>
    <Route path='/register' element={<ApplicationForm/>}/>
   </Routes>
  )
}

export default MentorRoutes
