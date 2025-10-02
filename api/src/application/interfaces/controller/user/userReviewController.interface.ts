import { Request, Response } from "express";

export interface IUserReviewController {
  getDomainReviews(req: Request, res: Response): Promise<void>;
  getAllReviews(req: Request, res: Response): Promise<void>;
  getSpecificReview(req: Request, res: Response): Promise<void>;
  getReviewsByDay(req: Request, res: Response): Promise<void>;
  cancelReview(req: Request, res: Response): Promise<void>;
  rescheduleReview(req: Request, res: Response): Promise<void>;
  getReviewCounts(req: Request, res: Response): Promise<void>;
}
