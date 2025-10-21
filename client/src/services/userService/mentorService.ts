import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";

export const rateMentor = async ({
  mentorId,
  stars,
}: {
  mentorId: string;
  stars: number;
}): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.post(`/mentors/${mentorId}/rate`, {
      stars,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};