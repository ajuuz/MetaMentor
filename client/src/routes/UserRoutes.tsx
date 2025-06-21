import Login from "@/pages/auth/Login"
import Otp from "@/pages/auth/Otp"
import Signup from "@/pages/auth/Signup"
import LandingPage from "@/pages/user/LandingPage/LandingPage"
import { Routes,Route } from "react-router-dom"
import { PublicOnlyRoute } from "./protectedRoutes/PublicOnlyRoute"
import SendEmail from "@/pages/auth/ForgotPassword/SendEmail"
import ForgotEmailSuccess from "@/pages/auth/ForgotPassword/ForgotSuccess"
import PasswordReset from "@/pages/auth/ForgotPassword/PasswordReset"

const UserRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>}/>
            <Route path="/signup" element={<PublicOnlyRoute><Signup/></PublicOnlyRoute>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/forgotPassword/sendMail" element={<SendEmail/>}/>
            <Route path="/forgotPassword/success" element={<ForgotEmailSuccess/>}/>
            <Route path="/forgotPassword/reset/:token" element={<PasswordReset/>}/>
            <Route path="/" element={<LandingPage/>}/>
        </Routes>
    </div>
  )
}

export default UserRoutes
