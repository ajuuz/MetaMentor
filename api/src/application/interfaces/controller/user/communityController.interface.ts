import { Request, Response } from "express";

export interface IUserCommunityController {
  getAllCommunities(req: Request, res: Response): Promise<void>;
  getCommunityChat(req: Request, res: Response): Promise<void>;
}
