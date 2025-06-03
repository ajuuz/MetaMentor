import {create} from "zustand";

export type User={
    name:string,
    email:string,
    role:'user' | 'admin' | 'mentor'
}

type UserStore={
    user:User|null;
    login:(user:User)=>void;
    logout:()=>void;
}

export const useUserStore = create<UserStore>((set)=>({
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