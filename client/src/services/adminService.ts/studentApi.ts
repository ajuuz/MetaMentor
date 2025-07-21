import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig"
import type { ApiResponseType } from "@/types/responseType";
import type { GetAllStudentResponseType } from "@/types/studentTypes";



export const getAllStudents=async(currentPage:number,limit:number):Promise<GetAllStudentResponseType>=>{
        const response = await adminAxiosInstance.get(`/students?currentPage=${currentPage}&limit=${limit}`);
        return response.data;
}


export const updateStudentStatus=async({userId,status}:{userId:string,status:boolean}):Promise<Omit<ApiResponseType<undefined>,'data'>>=>{
    try{
        const response = await adminAxiosInstance.patch(`/students/${userId}`,{status})
        return response.data;
    }
    catch(error:any){
        throw error?.response?.data || error;
    }
}