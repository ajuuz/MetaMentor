import { ROLES } from "shared/constants";

export interface IUserEntity{
    name:string,
    profileImage?:string,
    country:string,
    gender:string,
    mobileNumber:number,
    email:string,
    password:string,
    createdAt:Date,
    role:ROLES,
    isBlocked:boolean,
    isVerified:boolean
}