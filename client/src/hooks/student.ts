import { getAllStudents } from "@/services/adminService.ts/studentApi";
import type { GetAllStudentResponseType } from "@/types/studentTypes";
import { useQuery } from "@tanstack/react-query";


//admin
export const useAdminGetAllStudentsQuery=(currentPage:number,limit:number,sortBy:string,searchTerm:string,selectedPremium:string[])=>{
    return useQuery<GetAllStudentResponseType>({
        queryKey:['adminGetAllStudents',currentPage,limit,sortBy,searchTerm,selectedPremium],
        queryFn:()=> getAllStudents(currentPage,limit,sortBy,searchTerm,selectedPremium)
    })
};
