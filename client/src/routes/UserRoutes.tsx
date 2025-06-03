import Login from "@/pages/auth/Login"
import Otp from "@/pages/auth/Otp"
import Signup from "@/pages/auth/Signup"
import LandingPage from "@/pages/user/LandingPage"
import { Routes,Route } from "react-router-dom"
import { UserLoginPrivate } from "./protectedRoutes/UserProctedRoute"
const UserRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<UserLoginPrivate><Login/></UserLoginPrivate>}/>
            <Route path="/signup" element={<UserLoginPrivate><Signup/></UserLoginPrivate>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/" element={<LandingPage/>}/>
        </Routes>
    </div>
  )
}

export default UserRoutes
