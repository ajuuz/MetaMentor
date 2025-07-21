import Dashboard from "@/pages/admin/dashboard/Dashboard"
import Mentors from "@/pages/admin/mentors/Mentors"
import MentorWrapper from "@/pages/admin/mentors/MentorWrapper"
import ManageStudents from "@/pages/admin/students/ManageStudents"
import MentorDetailsManage from "@/pages/common/mentorDetailsManage/MentorDetailsManage"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"
import AdminLayout from "@/layouts/AdminLayout"
import ManageDomain from "@/pages/admin/domains/ManageDomain"
import Domains from "@/pages/admin/domains/Domains"
import Community from "@/pages/admin/community/Community"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>

      {/* admin layout */}
        <Route element={<AdminLayout/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>

            <Route path='/mentors/application' element={<MentorWrapper isVerified={false}>
                                                          {(tableHeaders,mentors,currentPage,setCurrentPage, totalPage) => (
                                                           <Mentors  tableHeaders={tableHeaders} mentors={mentors}  currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage}/>
                                                          )}
                                                        </MentorWrapper>}/>
                                                        
            <Route path='/mentors' element={<MentorWrapper isVerified={true}>
                                               {(tableHeaders,mentors,currentPage,setCurrentPage, totalPage) => (
                                                <Mentors  tableHeaders={tableHeaders} mentors={mentors}  currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage}/>
                                               )}
                                             </MentorWrapper>}/>
                                             
            <Route path='/mentors/:mentorId/verify' element={<MentorDetailsManage/>}/>
            <Route path='/students' element={<ManageStudents/>}/>
            <Route path='/domains' element={<Domains/>}/>
            <Route path='/communities' element={<Community/>}/>
        </Route>
        
        <Route path="/domains/add" element={<ManageDomain/>}/>

      </Route>
    </Routes>
  )
}

export default AdminRoutes
