import {
  getDomainForAdmin,
  getDomainsForAdmin,
} from "@/services/adminService.ts/domainApi";
import { getDomainsNameAndId } from "@/services/mentorService.ts/registrationApi";
import {
  getDomainsForStud,
  getSpecificDomain,
  getEnrolledDomains,
  getEnrolledDomain,
} from "@/services/userService/domainApi";
import type { DomainEntity } from "@/types/domainTypes";
import type {
  GetDomainForAdminRes,
  GetDomainForStudRes,
  GetDomainsForAdminRes,
  GetDomainsForStudRes,
  GetEnrolledDomainsRes,
} from "@/types/response/domain";
import type { EnrolledLevelRes } from "@/types/response/enrolledLevel";
import type { LevelRes } from "@/types/response/level";
import type { StudentReviewCard } from "@/types/reviewTypes";
import { useQuery } from "@tanstack/react-query";

//users
export const useGetDomainsNameAndIdQuery = () => {
  return useQuery<Pick<DomainEntity, "_id" | "name" | "image">[]>({
    queryKey: ["getDomainsNameAndId"],
    queryFn: getDomainsNameAndId,
  });
};

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
  return useQuery<{
    reviews: StudentReviewCard[];
    domain: Omit<DomainEntity, "isBlocked">;
    noOfLevelPassed: number;
    nextLevels: EnrolledLevelRes[];
  }>({
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

export const useGetDomainForAdminQuery = (domainId: string) => {
  return useQuery<GetDomainForAdminRes & { levels: LevelRes[] }>({
    queryKey: ["getDomainForAdmin", domainId],
    queryFn: () => getDomainForAdmin(domainId),
  });
};
