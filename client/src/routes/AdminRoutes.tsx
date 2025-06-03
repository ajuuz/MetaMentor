import Header from "@/components/admin/Header"
import Dashboard from "@/pages/admin/dashboard/Dashboard"
import ManageMentors from "@/pages/admin/manageMentors/ManageMentors"
import ManageStudents from "@/pages/admin/manageStudents/ManageStudents"
import { Route, Routes } from "react-router-dom"

const AdminRoutes = () => {
  return (
    <>
    <Header/>
    <div className="pt-20">
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/mentors' element={<ManageMentors/>}/>
      <Route path='/students' element={<ManageStudents/>}/>
    </Routes>
    </div>
    </>
  )
}

export default AdminRoutes
