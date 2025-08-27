import { getAllMentors } from "@/services/adminService.ts/mentorApi";
import type { GetAllMentorResponseType } from "@/types/mentorType";
import { useQuery } from "@tanstack/react-query";



//admin
export const useGetMentorsForAdminQuery=(currentPage:number,limit:number,isVerified:boolean,sortBy:string,searchTerm:string,selectedDomains:string[])=>{
    return useQuery<GetAllMentorResponseType>({
        queryKey:['getMentorsForAdmin',currentPage,limit,isVerified,sortBy,searchTerm,selectedDomains],
        queryFn:()=> getAllMentors({currentPage,
            limit,
            isVerified,
            sortBy,
            searchTerm,
            selectedDomains})
    })
};
