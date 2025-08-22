import { Request, Response } from "express";

export interface IAdminCommunityController {
  getAllCommunities(
    req: Request,
    res: Response,
  ): Promise<void>;
  updateCommunityStatus(
    req: Request,
    res: Response,
  ): Promise<void>;
}
