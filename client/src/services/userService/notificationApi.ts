import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { NotificationEntity } from "@/types/entity/notification";
import type { MutationApiResponse } from "@/types/responseType";

export const getNotifications = async (
  filter: "all" | "unRead"
): Promise<Omit<NotificationEntity, "userId">[]> => {
  try {
    const response = await userAxiosInstance.get(
      `/notifications?filter=${filter}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const markAsRead = async (): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.patch("/notifications");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
