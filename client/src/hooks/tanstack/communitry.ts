import { getAllCommunities } from "@/services/adminService.ts/communityApi";
import { getCommunityChats, getEnrolledCommunities } from "@/services/userService/communityApi";
import type { GetAllCommunity } from "@/types/communityTypes";
import type { DomainEntity } from "@/types/domainTypes";
import type { IGetCommunityChat } from "@/types/entity/communityChat";
import { useQuery } from "@tanstack/react-query";

//admin
export const useAdminGetAllCommunitiesQuery=(currentPage:number,limit:number,sortBy:string,searchTerm:string)=>{
    return useQuery<GetAllCommunity>({
        queryKey: ['getCommunitiesForAdmin',currentPage,limit,sortBy,searchTerm],
        queryFn: () => getAllCommunities(currentPage,limit,sortBy,searchTerm)
    })
};

export const useGetAllCommunitiesForStudentQuery=(currentPage:number,limit:number)=>{
    return useQuery<DomainEntity>({
        queryKey:['enrolledDomains',currentPage,limit],
        queryFn:()=> getEnrolledCommunities(currentPage,limit)
    })
};

export const useGetCommunityChatForStudentQuery=(communityId:string)=>{
    return useQuery<IGetCommunityChat[]>({
        queryKey:['getCommunityChat'],
        queryFn:()=> getCommunityChats(communityId)
    })
};

