import { REVIEW_STATUS, ROLES } from "shared/constants";

export interface IReviewCountUsecase {
  execute(
    role: ROLES,
    userId?: string
  ): Promise<{ _id: REVIEW_STATUS; count: number }[]>;
}
