import { useUserStore, type UserType } from "@/zustand/userStore"
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Prop={
    children:ReactNode
}
const MentorApplicationProctedRoute = ({children}:Prop) => {
    const user:UserType|null=useUserStore(state=>state.user);
    if(user?.role==='user'){
        return children
    }
    return <Navigate to='/'/>
}

export default MentorApplicationProctedRoute
