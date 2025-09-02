import { getAllCommunities } from "@/services/adminService.ts/communityApi";
import { getEnrolledCommunities } from "@/services/userService/communityApi";
import type { GetAllCommunity } from "@/types/communityTypes";
import type { GetAllDomains } from "@/types/domainTypes";
import { useQuery } from "@tanstack/react-query";


//admin
export const useAdminGetAllCommunitiesQuery=(currentPage:number,limit:number,sortBy:string,searchTerm:string)=>{
    return useQuery<GetAllCommunity>({
        queryKey: ['getCommunitiesForAdmin',currentPage,limit,sortBy,searchTerm],
        queryFn: () => getAllCommunities(currentPage,limit,sortBy,searchTerm)
    })
};

export const useGetAllCommunitiesForStudentQuery=(currentPage:number,limit:number)=>{
    return useQuery<GetAllDomains>({
        queryKey:['enrolledDomains',currentPage,limit],
        queryFn:()=> getEnrolledCommunities(currentPage,limit)
    })
};

