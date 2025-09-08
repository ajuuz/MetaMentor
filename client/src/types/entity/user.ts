import type { ROLES } from "@/utils/constants";
export interface IUserEntity{
    _id:string,
    name:string,
    profileImage:string|null,
    country:string|null,
    gender:string|null,
    mobileNumber:number|null,
    email:string,
    password:string|null,
    role:ROLES,
    googleId:string|null,
    isBlocked:boolean,
    isVerified:boolean,
    createdAt:Date,
    updatedAt:Date,
}