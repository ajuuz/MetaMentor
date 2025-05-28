import Login from "@/pages/auth/Login"
import Otp from "@/pages/auth/Otp"
import Signup from "@/pages/auth/Signup"
import LandingPage from "@/pages/user/LandingPage"
import { Routes,Route } from "react-router-dom"
const UserRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/otp" element={<Otp/>}/>
            <Route path="/" element={<LandingPage/>}/>
        </Routes>
    </div>
  )
}

export default UserRoutes
