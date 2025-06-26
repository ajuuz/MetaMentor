import { ROLES } from "shared/constants";

export interface IUserEntity{
    name:string,
    profileImage:string|null,
    country:string|null,
    gender:string|null,
    mobileNumber:number|null,
    email:string,
    password:string|null,
    createdAt:Date,
    role:ROLES,
    googleId:string|null,
    isBlocked:boolean,
    isVerified:boolean
}