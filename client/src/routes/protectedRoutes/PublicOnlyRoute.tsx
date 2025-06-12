import { useUserStore, type UserType } from "@/zustand/userStore"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"


export const PublicOnlyRoute = ({children}:{children:ReactNode})=>{
    const user:UserType | null= useUserStore().user
    if(user){
        if(user.role==='admin'){
            return <Navigate to="/admin/dashboard"/>
        }
        else{
            return <Navigate to="/"/>
        }
    }
    return children
}