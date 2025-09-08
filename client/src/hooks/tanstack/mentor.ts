import { getAllMentors, getMentorApplicationDetailsForAdmin } from "@/services/adminService.ts/mentorApi";
import { getProfessionalDetails } from "@/services/mentorService.ts/mentorApi";
import {
  getAllMentorsForStud,
  getMyApplicationDetails,
} from "@/services/userService/mentorApi";
import type { GetAllMentorResponseType } from "@/types/mentorType";
import type { GetMentorApplicationDetialsForAdminRes, GetMentorApplicationDetialsForUserRes, GetProfessionalDetailsForMentorRes } from "@/types/response/mentor";
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

//mentor application -admin
export const useGetMentorApplicationDetailsForAdminQuery = (mentorId:string) => {
  return useQuery<GetMentorApplicationDetialsForAdminRes>({
    queryKey: ["getMentorApplicationDetialsForUser",mentorId],
    queryFn: ()=>getMentorApplicationDetailsForAdmin(mentorId),
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

//mentor application for user
export const useGetMentorApplicationDetailsForUserQuery = () => {
  return useQuery<GetMentorApplicationDetialsForUserRes>({
    queryKey: ["getMentorApplicationDetialsForUser"],
    queryFn: getMyApplicationDetails,
  });
};



//-----Mentor -----//
export const useGetProfessionalDetailsForMentQuery = () => {
  return useQuery<GetProfessionalDetailsForMentorRes>({
    queryKey: ["getProfessionalDetailsForMentor"],
    queryFn: getProfessionalDetails,
  });
};
