import {  Request, Response } from "express";

export interface IMentorReviewController {
  getAllReviews(req: Request, res: Response): Promise<void>;
  getReview(req: Request, res: Response): Promise<void>;
  cancelReview(req: Request, res: Response): Promise<void>
  submitReviewResult(
    req: Request,
    res: Response,
  ): Promise<void>;
}
