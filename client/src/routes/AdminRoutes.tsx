import Dashboard from "@/pages/admin/dashboard/Dashboard"
import ManageMentors from "@/pages/admin/manageMentors/ManageMentors"
import ManageMentorWrapper from "@/pages/admin/manageMentors/ManageMentorWrapper"
import ManageStudents from "@/pages/admin/manageStudents/ManageStudents"
import MentorDetailsManage from "@/pages/common/mentorDetailsManage/MentorDetailsManage"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"
import AdminLayout from "@/layouts/AdminLayout"
import ManageDomain from "@/pages/admin/domains/ManageDomain"

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>

      {/* admin layout */}
        <Route element={<AdminLayout/>}>
            <Route path='/dashboard' element={<Dashboard/>}/>

            <Route path='/mentors/application' element={<ManageMentorWrapper isVerified={false}>
                                                          {(tableHeaders,mentors,currentPage,setCurrentPage, totalPage) => (
                                                           <ManageMentors  tableHeaders={tableHeaders} mentors={mentors}  currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage}/>
                                                          )}
                                                        </ManageMentorWrapper>}/>
                                                        
            <Route path='/mentors' element={<ManageMentorWrapper isVerified={true}>
                                               {(tableHeaders,mentors,currentPage,setCurrentPage, totalPage) => (
                                                <ManageMentors  tableHeaders={tableHeaders} mentors={mentors}  currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage}/>
                                               )}
                                             </ManageMentorWrapper>}/>
                                             
            <Route path='/mentors/:mentorId/verify' element={<MentorDetailsManage/>}/>
            <Route path='/students' element={<ManageStudents/>}/>
        </Route>
        
        <Route path="/domain/add" element={<ManageDomain/>}/>

      </Route>
    </Routes>
  )
}

export default AdminRoutes
