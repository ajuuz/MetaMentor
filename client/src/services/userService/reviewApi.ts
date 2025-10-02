import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";
import type {
  GetStudentReviewResponseDTO,
  PopulatedReviewEntity,
} from "@/types/reviewTypes";
import type {
  DATE_RANGE,
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
  ReviewStatus,
} from "@/utils/constants";

export const getReviews = async (
  type: "upcoming" | "completed"
): Promise<GetStudentReviewResponseDTO[]> => {
  try {
    const response = await userAxiosInstance.get(`/reviews?type=${type}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getReviewForStudent = async (
  reviewId: string
): Promise<PopulatedReviewEntity> => {
  try {
    const response = await userAxiosInstance.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getReviewsForStudent = async (
  status: REVIEW_FILTER_STATUS,
  dateRange: DATE_RANGE,
  currentPage: number,
  limit: number,
  pendingReviewState?: PENDING_REVIEW_STATE
) => {
  try {
    const response = await userAxiosInstance.get(
      `/reviews?status=${status}&dateRange=${dateRange}&currentPage=${currentPage}&limit=${limit}&pendingReviewState=${pendingReviewState}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getSlotReviewsForStudent = async (
  mentorId: string | undefined,
  date: Date
) => {
  try {
    const response = await userAxiosInstance.get(
      `/reviews/${mentorId}/${date.toISOString()}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const cancelReviewByStudent = async (
  reviewId: string
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.patch(`/reviews/${reviewId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const rescheduleReviewByStudent = async ({
  studentText,
  reviewId,
  mentorId,
  slot,
}: {
  studentText: string;
  reviewId: string;
  mentorId: string;
  slot: { start: string; end: string };
}): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.patch(
      `/reviews/${reviewId}/reschedule`,
      { studentText, mentorId, slot }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};


export const getReviewCountsForStudent = async (): Promise<
  {
    _id: ReviewStatus;
    count: number;
  }[]
> => {
  try {
    const response = await userAxiosInstance.get("/reviews/count");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};