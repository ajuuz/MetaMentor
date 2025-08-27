import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig"
import type { MutationApiResponse } from "@/types/responseType";
import type { GetAllStudentResponseType } from "@/types/studentTypes";



export const getAllStudents=async(currentPage:number,limit:number,sortBy:string,searchTerm:string,isPremium:string[]):Promise<GetAllStudentResponseType>=>{
    try{
        let url=`/students?currentPage=${currentPage}&limit=${limit}&sortBy=${sortBy}&searchTerm=${searchTerm}`
        if(isPremium.length>0){
            url+=`&isPremium=${isPremium[0]==='yes'?true:false}`
        }
        const response = await adminAxiosInstance.get(url);
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error
    }
}


export const updateStudentStatus=async({userId,status}:{userId:string,status:boolean}):Promise<MutationApiResponse>=>{
    try{
        const response = await adminAxiosInstance.patch(`/students/${userId}`,{status})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error;
    }
}