import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";

export const updateLevelBlockStatus = async ({
  levelId,
  status,
}: {
  levelId: string;
  status: boolean;
}): Promise<MutationApiResponse> => {
  try {
    const response = await adminAxiosInstance.patch(
      `/levels/${levelId}/status`,
      { status }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
