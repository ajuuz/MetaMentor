import {
  getReviewForMentor,
  getReviewsForMentor,
  getSlotReviewsForMent,
} from "@/services/mentorService.ts/reviewApi";
import {
  getReviewForStudent,
  getReviewsForStudent,
  getSlotReviewsForStudent,
} from "@/services/userService/reviewApi";
import type {
  GetDomainReviewSlotResponseDTO,
  PopulatedReviewEntity,
} from "@/types/reviewTypes";
import type {
  DATE_RANGE,
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
} from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";


//////////////----------------mentor-------------------///////////////
export const useGetReviewsForMentorQuery = (
  status: REVIEW_FILTER_STATUS,
  dateRange: DATE_RANGE,
  currentPage: number,
  limit: number,
  pendingReviewState?: PENDING_REVIEW_STATE
) => {
  return useQuery<{reviews:PopulatedReviewEntity[],totalPages:number}>({
    queryKey: [
      "getReviewsForMentor",
      status,
      dateRange,
      currentPage,
      limit,
      pendingReviewState,
    ],
    queryFn: () =>
      getReviewsForMentor(
        status,
        dateRange,
        currentPage,
        limit,
        pendingReviewState
      ),
  });
};

export const useGetReviewForMentorQuery = (reviewId: string) => {
  return useQuery<PopulatedReviewEntity>({
    queryKey: ["getReviewForMentor", reviewId],
    queryFn: () => getReviewForMentor(reviewId),
  });
};


//////////////////-----------------student-------------------------///////////////////
export const useGetReviewsForStudentQuery = (
  status: REVIEW_FILTER_STATUS,
  dateRange: DATE_RANGE,
  currentPage: number,
  limit: number,
  pendingReviewState?: PENDING_REVIEW_STATE
) => {
  return useQuery<{reviews:PopulatedReviewEntity[],totalPages:number}>({
    queryKey: [
      "getReviewsForStudent",
      status,
      dateRange,
      currentPage,
      limit,
      pendingReviewState,
    ],
    queryFn: () =>
      getReviewsForStudent(
        status,
        dateRange,
        currentPage,
        limit,
        pendingReviewState
      ),
  });
};

export const useGetReviewForStudentQuery = (reviewId: string) => {
  return useQuery<PopulatedReviewEntity>({
    queryKey: ["getReviewForMentor", reviewId],
    queryFn: () => getReviewForStudent(reviewId),
  });
};

export const useGetSlotReviewsForStudentQuery = (
  mentorId: string | undefined,
  date: Date
) => {
  return useQuery<GetDomainReviewSlotResponseDTO>({
    queryKey: ["getDomainReviewsSlot", mentorId, date],
    queryFn: () => getSlotReviewsForStudent(mentorId!, date!),
    enabled: !!mentorId && !!date,
  });
};

///================mentor================//
export const useGetSlotReviewsForMentQuery = (date: Date) => {
  return useQuery<GetDomainReviewSlotResponseDTO>({
    queryKey: ["getDomainReviewsSlot", date],
    queryFn: () => getSlotReviewsForMent(date!),
    enabled: !!date,
  });
};
