import type { AuthFormType } from "@/types/authTypes"
import type { ApiResponseType, MutationApiResponse } from "@/types/responseType";
import type { UserType } from "@/zustand/userStore";
import { authAxiosInstance } from "@/config/axiosConfig/authAxiosConfig";

export const signup = async (formData:Omit<AuthFormType , "confirmPwd">):Promise<MutationApiResponse> => {
    try{
        const response = await authAxiosInstance.post('/signup', formData);
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error
    }
}

export const verifyOtp = async ({email,otp}:{email:string,otp:string}):Promise<MutationApiResponse> => {
    try{
        const response = await authAxiosInstance.post('/otp/verify', {email,otp});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error
    }
}

export const resendOtp = async(email:string):Promise<MutationApiResponse>=>{
     try{
        const response = await authAxiosInstance.post('/otp/resend',{email});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error
    }
}

export const login = async ({email,password,fcmToken}:{email:string,password:string,fcmToken:string|null}):Promise<Required<ApiResponseType<UserType>>> => {
    try{
        console.log(fcmToken)
        const response = await authAxiosInstance.post('/login', {email,password,fcmToken});
        return response.data;
    }catch(error:any) {
        throw error?.response.data || error;
    }
}


export const googleAuth=async({idToken,fcmToken}:{idToken:string,fcmToken:string|null}):Promise<Required<ApiResponseType<UserType>>>=>{
    try{
        const response = await authAxiosInstance.post('/googleAuth',{idToken,fcmToken})
        return response.data
    }
    catch(error:any){
        throw error?.response.data || error;
    }
}


export const logout =async():Promise<MutationApiResponse>=>{
    try{
        const response = await authAxiosInstance.post('/logout')
        return response.data
    }
    catch(error:any){
        throw error?.response.data || error
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


export const forgotPasswordSendMail=async(email:string):Promise<MutationApiResponse>=>{
    try{
        const response = await authAxiosInstance.post('/forgotPassword/mail',{email})
        return response.data;
    }
    catch(error:any){
        throw error?.response.data || error
    }
}

export const resetPassword=async({password,token}:{password:string,token:string}):Promise<MutationApiResponse>=>{
    try{
        const response = await authAxiosInstance.patch('/forgotPassword/reset',{password,token})
        return response.data;
    }
    catch(error:any){
        throw error?.response.data || error
    }
}

