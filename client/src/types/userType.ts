import type { ROLES } from "@/utils/constants";

export interface UserDetailsType{
    _id:string,
    name:string,
    profileImage:string|null,
    country:string|null,
    gender:string|null,
    mobileNumber:number|null,
    email:string,
    role:ROLES,
    isVerified:boolean
}