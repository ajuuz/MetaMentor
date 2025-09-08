import { mentorInstance } from "@/config/axiosConfig/mentorAxiosConfig";
import type { GetProfessionalDetailsForMentorRes } from "@/types/response/mentor";

export const getProfessionalDetails = async (): Promise<GetProfessionalDetailsForMentorRes> => {
  try {
    const response = await mentorInstance.get("/details/professional");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
