import type { AuthFormType } from "@/types/authTypes"
import type { ApiResponseType } from "@/types/responseType";
import type { UserType } from "@/zustand/userStore";
import { authAxiosInstance } from "@/config/axiosConfig/authAxiosConfig";

export const signup = async (formData:Omit<AuthFormType , "confirmPwd">):Promise<Omit<ApiResponseType<undefined>,'data'>> => {
    try{
        const response = await authAxiosInstance.post('/signup', formData);
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error
    }
}

export const verifyOtp = async ({email,otp}:{email:string,otp:string}):Promise<Omit<ApiResponseType<undefined>,'data'>> => {
    try{
        const response = await authAxiosInstance.post('/otp/verify', {email,otp});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error
    }
}

export const resendOtp = async(email:string):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
     try{
        const response = await authAxiosInstance.post('/otp/resend',{email});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error
    }
}

export const login = async ({email,password}:{email:string,password:string}):Promise<Required<ApiResponseType<UserType>>> => {
    try{
        const response = await authAxiosInstance.post('/login', {email,password});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error;
    }
}


// export const getLoggedInUserDetails=async()=>{
//     try{
//         const response = await authAxiosInstance.get('/getLoggedInUser')
//         return response.data;
//     }
//     catch(error:any){
//         throw error?.response.data || error
//     }
// }


export const forgotPasswordSendMail=async(email:string):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
    try{
        const response = await authAxiosInstance.post('/forgotPassword/mail',{email})
        return response.data;
    }
    catch(error:any){
        throw error?.response.data || error
    }
}

export const resetPassword=async({password,token}:{password:string,token:string}):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
    try{
        const response = await authAxiosInstance.patch('/forgotPassword/reset',{password,token})
        return response.data;
    }
    catch(error:any){
        throw error?.response.data || error
    }
}

