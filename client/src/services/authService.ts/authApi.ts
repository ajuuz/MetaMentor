import type { AuthFormType } from "@/types/auth/authTypes"
import { axiosInstance } from "../../config/axiosConfig";

export const signup = async (formData:Omit<AuthFormType , "confirmPwd">) => {
    try{
        console.log("Form data being sent:");
        const response = await axiosInstance.post('/auth/signup', formData);
        return response.data;
    }catch(error:any) {
        console.log(error.response.data)
        throw error.response.data
    }
}

export const verifyOtp = async (email:string,otp:string) => {
    try{
        const response = await axiosInstance.post('/auth/verifyOtp', {email,otp});
        return response.data;
    }catch(error:any) {
        console.log(error.response.data)
        throw error.response.data
    }
}


