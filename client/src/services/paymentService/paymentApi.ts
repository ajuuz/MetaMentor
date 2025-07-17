import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig"
import type { VerifyPaymentDTO } from "@/types/paymentType";



export const createOrder=async(slotId:string,amount:number)=>{
    try{
        const response = await userAxiosInstance.post('/payment/createOrder',{slotId,amount})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}

export const verifyPayment=async(data:VerifyPaymentDTO)=>{
    try{
        const response = await userAxiosInstance.post('/payment/verifyPayment',data)
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}