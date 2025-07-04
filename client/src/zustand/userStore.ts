import {create} from "zustand";

export type UserType={
    name:string,
    email:string,
    role:'user' | 'admin' | 'mentor'
}

type UserStoreType={
    user:UserType|null;
    login:(user:UserType)=>void;
    logout:()=>void;
}

export const useUserStore = create<UserStoreType>((set)=>({
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user") as string):null,
    login(user) {
        set({user})
        localStorage.setItem('user',JSON.stringify(user))
    },
    logout() {
        set({user:null})
        localStorage.removeItem('user')
    },
}))


// const getUser=async()=>{
//     try{
//         const response = await getLoggedInUserDetails()
//         return response.data;
//     }catch(error){
//         console.log(error)
//     }
// }