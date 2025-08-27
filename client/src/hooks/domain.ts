import { getDomainsForAdmin } from "@/services/adminService.ts/domainApi";
import { getAllDomains, getSpecificDomain, getEnrolledDomains, getEnrolledDomain } from "@/services/userService/domainApi"
import type { DomainWithLevel, EnrolledDomain, GetAllDomains } from "@/types/domainTypes";
import { useQuery } from "@tanstack/react-query"


//users
export const useUserGetSpecificDomainQuery=(domainId:string)=>{
    return useQuery<DomainWithLevel>({
        queryKey: ['domain', domainId],
        queryFn: () => getSpecificDomain(domainId as string)
    })
};

export const useUserGetAllDomainsQuery=(currentPage:number,limit:number,sortBy:string,searchTerm:string)=>{
    return useQuery<GetAllDomains>({
        queryKey:['userGetAllDomains',currentPage,limit,sortBy,searchTerm],
        queryFn:()=> getAllDomains(currentPage,limit,sortBy,searchTerm)
    })
};


export const useEnrolledDomainQuery=(domainId:string)=>{
    return useQuery<EnrolledDomain>({
        queryKey:['enrolledDomain',domainId],
        queryFn:()=> getEnrolledDomain(domainId)
    })
};

export const useEnrolledDomainsQuery=(currentPage:number,limit:number)=>{
    return useQuery<GetAllDomains>({
        queryKey:['enrolledDomains',currentPage,limit],
        queryFn:()=> getEnrolledDomains(currentPage,limit)
    })
};


//admin
export const useAdminGetAllDomainsQuery=(currentPage:number,limit:number,sortBy:string,searchTerm:string)=>{
    return useQuery<GetAllDomains>({
        queryKey:['adminGetAllDomains',currentPage,limit,sortBy,searchTerm],
        queryFn:()=> getDomainsForAdmin(currentPage,limit,sortBy,searchTerm)
    })
};