import type { ROLES } from "@/utils/constants";

export interface UserDetailsType{
    _id:string,
    name:string,
    profileImage?:string,
    country:string,
    gender:string,
    mobileNumber:number,
    email:string,
    role:ROLES,
    isVerified:boolean
}