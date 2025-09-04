import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { GetAllMentorResponseType } from "@/types/mentorType";
import type { GetMentorApplicationDetialsRes } from "@/types/response/mentor";
import type { MutationApiResponse } from "@/types/responseType";


//mentor application
export const getMyApplicationDetails =
  async (): Promise<GetMentorApplicationDetialsRes> => {
    try {
      const response = await userAxiosInstance.get(`/application`);
      return response.data;
    } catch (error: any) {
      throw error?.response?.data || error;
    }
  };

export const updateMentorAplication = async (
  formData: FormData
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.patch(
      "/application",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response.data || error;
  }
};


type GetAllMentorArgumentType = {
  currentPage: number;
  limit: number;
  sortBy: string;
  searchTerm: string;
  selectedDomains: string;
};

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

