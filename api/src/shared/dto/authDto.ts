import { ROLES } from "shared/constants";

export type SignupRequestDto = {
    name: string;
    email: string;
    password: string;
    mobileNumber: string;
    country: string;
    gender: string;
}


export type loginResponseDTO = {
    name:string,
    email:string,
    role:ROLES,
    accessToken:string,
    refreshToken:string
}