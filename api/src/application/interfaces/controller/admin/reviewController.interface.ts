import { Request, Response } from "express";

export interface IAdminReviewController {
  getReviewCounts(req: Request, res: Response): Promise<void>;
  getReviewGrowth(req: Request, res: Response): Promise<void>;
}
