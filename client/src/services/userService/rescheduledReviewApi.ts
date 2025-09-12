import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { IRescheduleReviewEntity } from "@/types/entity/rescheduledReview";

export const getRescheduledReview = async (
  reviewId: string
): Promise<IRescheduleReviewEntity> => {
  try {
    const response = await userAxiosInstance.get(
      `rescheduledReviews/${reviewId}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
