import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig"



export const createOrder=async(slotId:string,amount:number)=>{
    try{
        const response = await userAxiosInstance.post('/payment/createOrder',{slotId,amount})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}