import { getAllStudents } from "@/services/adminService.ts/studentApi";
import type { GetAllStudentResponseType } from "@/types/studentTypes";
import { useQuery } from "@tanstack/react-query";


//admin
export const useAdminGetAllStudentsQuery=(currentPage:number,limit:number)=>{
    return useQuery<GetAllStudentResponseType>({
        queryKey:['adminGetAllStudents',currentPage,limit],
        queryFn:()=> getAllStudents(currentPage,limit)
    })
};
