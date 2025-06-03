import { useUserStore, type User } from '@/zustand/userStore'
import {  type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


type Prop={
    children:ReactNode
}
export const UserPrivate = ({children}:Prop) => {
    const user:User | null= useUserStore(state=>state.user)
    if(!user || user.role!=='user'){
        return <Navigate to="/"/>
    }
    return children;
}


export const UserLoginPrivate = ({children}:Prop)=>{
    const user:User | null= useUserStore(state=>state.user)
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
