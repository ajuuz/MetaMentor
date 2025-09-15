import { Request, Response } from "express";

export interface IUserRescheduledReviewController {
  getRescheduledReview(req: Request, res: Response): Promise<void>;
}
