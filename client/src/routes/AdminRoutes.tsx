import Dashboard from "@/pages/admin/dashboard/Dashboard";
import Mentors from "@/pages/admin/mentors/Mentors";
import MentorWrapper from "@/pages/admin/mentors/MentorWrapper";
import ManageStudents from "@/pages/admin/students/ManageStudents";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import AdminLayout from "@/layouts/AdminLayout";
import Domains from "@/pages/admin/domains/Domains";
import Community from "@/pages/admin/community/Community";
import ApplicationVerification from "@/pages/admin/mentors/Verification";
import EditDomain from "@/pages/admin/domains/EditDomain";
import AddDomain from "@/pages/admin/domains/AddDomain";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        {/* admin layout */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/mentors/application"
            element={
              <MentorWrapper isVerified={false}>
                {(
                  tableHeaders,
                  mentors,
                  currentPage,
                  setCurrentPage,
                  limit,
                  setLimit,
                  totalPage,
                  sortBy,
                  setSortBy,
                  searchTerm,
                  setSearchTerm,
                  selectedDomains,
                  setSelectedDomains
                ) => (
                  <Mentors
                    tableHeaders={tableHeaders}
                    mentors={mentors}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limit={limit}
                    setLimit={setLimit}
                    totalPage={totalPage}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedDomains={selectedDomains}
                    setSelectedDomains={setSelectedDomains}
                    h1Content="Mentor Applications"
                  />
                )}
              </MentorWrapper>
            }
          />

          <Route
            path="/mentors"
            element={
              <MentorWrapper isVerified={true}>
                {(
                  tableHeaders,
                  mentors,
                  currentPage,
                  setCurrentPage,
                  limit,
                  setLimit,
                  totalPage,
                  sortBy,
                  setSortBy,
                  searchTerm,
                  setSearchTerm,
                  selectedDomains,
                  setSelectedDomains
                ) => (
                  <Mentors
                    tableHeaders={tableHeaders}
                    mentors={mentors}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    limit={limit}
                    setLimit={setLimit}
                    totalPage={totalPage}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedDomains={selectedDomains}
                    setSelectedDomains={setSelectedDomains}
                    h1Content="Mentors"
                  />
                )}
              </MentorWrapper>
            }
          />

          <Route
            path="/mentors/:mentorId/verify"
            element={<ApplicationVerification />}
          />
          <Route path="/students" element={<ManageStudents />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/communities" element={<Community />} />

          <Route path="/domains/add" element={<AddDomain />} />
          <Route path="/domains/:domainId/edit" element={<EditDomain />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
