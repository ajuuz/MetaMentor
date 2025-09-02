import { getDomainsForAdmin } from "@/services/adminService.ts/domainApi";
import {
  getDomainsForStud,
  getSpecificDomain,
  getEnrolledDomains,
  getEnrolledDomain,
} from "@/services/userService/domainApi";
import type { EnrolledDomain } from "@/types/domainTypes";
import type {
  GetDomainForStudRes,
  GetDomainsForAdminRes,
  GetDomainsForStudRes,
  GetEnrolledDomainsRes,
} from "@/types/response/domain";
import type { LevelRes } from "@/types/response/level";
import { useQuery } from "@tanstack/react-query";

//users
export const useUserGetSpecificDomainQuery = (domainId: string) => {
  return useQuery<GetDomainForStudRes & { levels: LevelRes[] }>({
    queryKey: ["getDomainForStud", domainId],
    queryFn: () => getSpecificDomain(domainId as string),
  });
};

export const useUserGetAllDomainsQuery = (
  currentPage: number,
  limit: number,
  sortBy: string,
  searchTerm: string
) => {
  return useQuery<{ domains: GetDomainsForStudRes[]; totalPages: number }>({
    queryKey: ["getDomainsForStud", currentPage, limit, sortBy, searchTerm],
    queryFn: () => getDomainsForStud(currentPage, limit, sortBy, searchTerm),
  });
};

export const useEnrolledDomainQuery = (domainId: string) => {
  return useQuery<EnrolledDomain>({
    queryKey: ["enrolledDomain", domainId],
    queryFn: () => getEnrolledDomain(domainId),
  });
};

export const useEnrolledDomainsQuery = (currentPage: number, limit: number) => {
  return useQuery<{ domains: GetEnrolledDomainsRes[]; totalPages: number }>({
    queryKey: ["enrolledDomains", currentPage, limit],
    queryFn: () => getEnrolledDomains(currentPage, limit),
  });
};

//admin
export const useAdminGetAllDomainsQuery = (
  currentPage: number,
  limit: number,
  sortBy: string,
  searchTerm: string
) => {
  return useQuery<{ domains: GetDomainsForAdminRes[]; totalPages: number }>({
    queryKey: ["getDomainsForAdmin", currentPage, limit, sortBy, searchTerm],
    queryFn: () => getDomainsForAdmin(currentPage, limit, sortBy, searchTerm),
  });
};
