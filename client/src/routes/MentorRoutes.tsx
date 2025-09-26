import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Dashboard from "@/pages/mentor/dashboard/Dashboard";
import SlotManage from "@/pages/mentor/slotManagement/SlotManage";
import MentorLayout from "@/layouts/MentorLayout";
import Profile from "@/pages/mentor/profile/Profile";
import MentorReviewsPage from "@/pages/mentor/Reviews/Reviews";
import UserWallet from "@/pages/user/wallet/UserWallet";
import ReviewPage from "@/pages/mentor/Review/Review";
import VideoCallPage from "@/pages/mentor/videoCall/VideoCallPage";

const MentorRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={["mentor"]} />}>
        <Route element={<MentorLayout />}>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reviews" element={<MentorReviewsPage />} />
          <Route path="/wallet" element={<UserWallet />} />
          <Route path="/slots" element={<SlotManage />} />
        </Route>
        <Route path="/reviews/:reviewId" element={<ReviewPage />} />
      </Route>

      <Route path='/call/:roomId' element={<VideoCallPage/>}/>
    </Routes>
  );
};

export default MentorRoutes;
