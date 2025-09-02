import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { GetAllMentorResponseType } from "@/types/mentorType";

type GetAllMentorArgumentType={
    currentPage:number,
    limit:number,
    sortBy:string,
    searchTerm:string,
    selectedDomains:string
}


export const getAllMentorsForStud = async ({
  currentPage,
  limit,
  sortBy,
  searchTerm,
  selectedDomains,
}: GetAllMentorArgumentType): Promise<GetAllMentorResponseType> => {
  try {
    const response = await userAxiosInstance.get(
      `/mentors?currentPage=${currentPage}&limit=${limit}&sortBy=${sortBy}&searchTerm=${searchTerm}&selectedDomains=${selectedDomains}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error?.response?.data || error;
  }
};
