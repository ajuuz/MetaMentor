import { getAllMentors } from "@/services/adminService.ts/mentorApi";
import {
  getAllMentorsForStud,
  getMyApplicationDetails,
} from "@/services/userService/mentorApi";
import type { GetAllMentorResponseType } from "@/types/mentorType";
import type { GetMentorApplicationDetialsRes } from "@/types/response/mentor";
import { useQuery } from "@tanstack/react-query";

//admin
export const useGetMentorsForAdminQuery = (
  currentPage: number,
  limit: number,
  isVerified: boolean,
  sortBy: string,
  searchTerm: string,
  selectedDomains: string[]
) => {
  return useQuery<GetAllMentorResponseType>({
    queryKey: [
      "getMentorsForAdmin",
      currentPage,
      limit,
      isVerified,
      sortBy,
      searchTerm,
      selectedDomains,
    ],
    queryFn: () =>
      getAllMentors({
        currentPage,
        limit,
        isVerified,
        sortBy,
        searchTerm,
        selectedDomains,
      }),
  });
};

//Student
export const useGetMentorsForDomainQuery = (
  currentPage: number,
  limit: number,
  sortBy: string,
  searchTerm: string,
  selectedDomains: string
) => {
  return useQuery<GetAllMentorResponseType>({
    queryKey: [
      "getMentorsForDomain",
      currentPage,
      limit,
      sortBy,
      searchTerm,
      selectedDomains,
    ],
    queryFn: () =>
      getAllMentorsForStud({
        currentPage,
        limit,
        sortBy,
        searchTerm,
        selectedDomains,
      }),
  });
};

//mentor application
export const useGetMentorApplicationDetailsQuery = () => {
  return useQuery<GetMentorApplicationDetialsRes>({
    queryKey: ["getMentorsForDomain"],
    queryFn: getMyApplicationDetails,
  });
};
