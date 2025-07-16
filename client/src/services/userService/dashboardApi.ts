import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";



export const getDomainInsight=async(domainId:string)=>{
  try{
         const response = await userAxiosInstance.get(`/dashboard/${domainId}`)
         return response.data;
     }
     catch(error:any){
         throw error?.response?.data || error
     }
}