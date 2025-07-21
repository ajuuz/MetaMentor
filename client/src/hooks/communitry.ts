import { getAllCommunities } from "@/services/adminService.ts/communityApi";
import type { GetAllCommunityType } from "@/types/communityTypes";
import { useQuery } from "@tanstack/react-query";


//admin
export const useAdminGetAllCommunitiesQuery=(currentPage:number,limit:number)=>{
    return useQuery<GetAllCommunityType>({
        queryKey: ['adminGetAllCommunities'],
        queryFn: () => getAllCommunities(currentPage,limit)
    })
};