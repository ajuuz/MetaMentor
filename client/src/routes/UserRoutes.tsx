import Login from "@/pages/auth/Login"
import Otp from "@/pages/auth/Otp"
import Signup from "@/pages/auth/Signup"
import LandingPage from "@/pages/user/LandingPage"
import { Routes,Route } from "react-router-dom"
import { PublicOnlyRoute } from "./protectedRoutes/PublicOnlyRoute"
const UserRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<PublicOnlyRoute><Login/></PublicOnlyRoute>}/>
            <Route path="/signup" element={<PublicOnlyRoute><Signup/></PublicOnlyRoute>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/" element={<LandingPage/>}/>
        </Routes>
    </div>
  )
}

export default UserRoutes
