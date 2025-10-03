import Login from "@/pages/auth/Login";
import Otp from "@/pages/auth/Otp";
import Signup from "@/pages/auth/Signup";
import LandingPage from "@/pages/user/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import { PublicOnlyRoute } from "./protectedRoutes/PublicOnlyRoute";
import SendEmail from "@/pages/auth/ForgotPassword/SendEmail";
import ForgotEmailSuccess from "@/pages/auth/ForgotPassword/ForgotSuccess";
import PasswordReset from "@/pages/auth/ForgotPassword/PasswordReset";
import MentorListing from "@/pages/user/mentors/MentorListing";
import Profile from "@/pages/user/Profile/Profile";
import UserLayout from "@/layouts/UserLayout";
import UserProfileLayout from "@/layouts/UserProfileLayout";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import Domains from "@/pages/user/domains/Domains";
import DomainDetail from "@/pages/user/domains/DomainDetail";
import Dashboard from "@/pages/user/dashboard/Dashboard";
import DomainInsight from "@/pages/user/dashboard/DomainInsight";
import ScheduleReview from "@/pages/user/scheduleReview/ScheduleReview";
import CommunityPost from "@/pages/user/community/CommunityThread";
import Communities from "@/pages/user/community/Communities";
import CreateMentorApplication from "@/pages/user/Application/Create";
import EditMentorApplication from "@/pages/user/Application/Edit";
import StudentReviewsPage from "@/pages/user/reviews/Reviews";
import UserWallet from "@/pages/user/wallet/UserWallet";
import ReviewsPage from "@/pages/user/review/Review";
import VideoCallPage from "@/pages/user/videoCall/VideoCallPage";
import ChatRoom from "@/pages/user/chat/ChatRoom";

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          }
        />
        <Route path="/otp" element={<Otp />} />
        <Route path="/forgotPassword/sendMail" element={<SendEmail />} />
        <Route
          path="/forgotPassword/success"
          element={<ForgotEmailSuccess />}
        />
        <Route
          path="/forgotPassword/reset/:token"
          element={<PasswordReset />}
        />

        {/* user layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mentors" element={<MentorListing />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/domains/:domainId" element={<DomainDetail />} />
          <Route element={<ProtectedRoute allowedRoles={["user", "mentor"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:domainId" element={<DomainInsight />} />
            <Route
              path="/review/schedule/:domainId/:levelId"
              element={<ScheduleReview />}
            />
            <Route path="/communities" element={<Communities />} />
            <Route
              path="/communities/:communityId"
              element={<CommunityPost />}
            />
            {/* user profile layout */}
            <Route element={<UserProfileLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/reviews" element={<StudentReviewsPage />} />
              <Route path="/reviews/:reviewId" element={<ReviewsPage />} />
              <Route path="/wallet" element={<UserWallet />} />
            </Route>
          </Route>
        </Route>


        <Route
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
              navitageTo="/admin/dashboard"
            />
          }
        >
          <Route path="/registration" element={<CreateMentorApplication />} />
          <Route path="/registration/edit" element={<EditMentorApplication />} />
        </Route>


        <Route path='/call/:roomId' element={<VideoCallPage/>}/>
        <Route path='/chat/:communityId' element={<ChatRoom/>}/>


      </Routes>
    </div>
  );
};

export default UserRoutes;
