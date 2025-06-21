import { ROLES } from "shared/constants";

export type SignupRequestDto = {
    name: string;
    profileImage:string,
    email: string;
    googleId:string,
    password: string;
    mobileNumber: string;
    country: string;
    gender: string;
    isVerified:boolean
}


export type loginResponseDTO = {
    name:string,
    email:string,
    role:ROLES,
    accessToken:string,
    refreshToken:string
}