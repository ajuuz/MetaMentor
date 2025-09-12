import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";



export const submitAssignments = async ({levelId,assignments}:{levelId: string,assignments:string[]}):Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.patch(`/enrolledLevels/${levelId}`,{assignments});
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
