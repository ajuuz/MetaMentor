import type { AuthFormType } from "@/types/auth/authTypes"
import { axiosInstance } from "../../config/axiosConfig/userAxiosConfig";

export const signup = async (formData:Omit<AuthFormType , "confirmPwd">) => {
    try{
        const response = await axiosInstance.post('/auth/signup', formData);
        return response.data;
    }catch(error:any) {
        throw error.response.data
    }
}

export const verifyOtp = async ({email,otp}:{email:string,otp:string}) => {
    try{
        const response = await axiosInstance.post('/auth/verifyOtp', {email,otp});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error
    }
}

export const login = async ({email,password}:{email:string,password:string}) => {
    try{
        const response = await axiosInstance.post('/auth/login', {email,password});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error;
    }
}





