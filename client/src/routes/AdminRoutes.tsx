import Header from "@/components/admin/Header"
import Dashboard from "@/pages/admin/dashboard/Dashboard"
import ManageMentors from "@/pages/admin/manageMentors/ManageMentors"
import ManageMentorWrapper from "@/pages/admin/manageMentors/ManageMentorWrapper"
import ManageStudents from "@/pages/admin/manageStudents/ManageStudents"
import MentorDetailsManage from "@/pages/common/mentorDetailsManage/MentorDetailsManage"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./protectedRoutes/ProtectedRoute"

const AdminRoutes = () => {
  return (
    <>
    <Header/>
    <div className="pt-20">
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
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
    </Routes>
    </div>
    </>
  )
}

export default AdminRoutes
