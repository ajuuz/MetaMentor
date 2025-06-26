import type { ROLES } from "@/utils/constants"
import { useUserStore } from "@/zustand/userStore"
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute = ({allowedRoles,navitageTo='/'}:{allowedRoles:ROLES[],navitageTo?:string}) => {

    const {user} = useUserStore();
    if(!user) return <Navigate to="/" replace/>

    if(!allowedRoles.includes(user.role)){
        return <Navigate to={navitageTo} replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute
