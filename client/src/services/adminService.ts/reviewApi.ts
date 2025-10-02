import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type { ReviewStatus, TimePeriod, TimePeriodGroupBy } from "@/utils/constants";



export const getReviewCountsForAdmin = async (): Promise<
  {
    _id: ReviewStatus;
    count: number;
  }[]
> => {
  try {
    const response = await adminAxiosInstance.get("/reviews/count");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getReviewGrowthForAdmin = async (
  timePeriod: TimePeriod,
  timePeriodGroupBy: TimePeriodGroupBy
): Promise<{ name: string; revenue: number; reviewCount: number }[]> => {
  try {
    const response = await adminAxiosInstance.get(
      `/reviews/growth?timePeriod=${timePeriod}&timePeriodGroupBy=${timePeriodGroupBy}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};