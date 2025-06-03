import { ROLES } from "shared/constants";

export interface ISignupRequestDto {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    country: string;
    gender: string;
}


export interface IloginDTO{
    name:string,
    email:string,
    role:ROLES,
    accessToken:string,
    refreshToken:string
}