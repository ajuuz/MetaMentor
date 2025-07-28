import { getAllCommunities } from "@/services/adminService.ts/communityApi";
import type { GetAllCommunity } from "@/types/communityTypes";
import { useQuery } from "@tanstack/react-query";


//admin
export const useAdminGetAllCommunitiesQuery=(currentPage:number,limit:number)=>{
    return useQuery<GetAllCommunity>({
        queryKey: ['adminGetAllCommunities'],
        queryFn: () => getAllCommunities(currentPage,limit)
    })
};