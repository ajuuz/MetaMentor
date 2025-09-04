import { Request, Response } from "express";

export interface IUserMentorController {
  getMentorApplicationDetails(req: Request, res: Response): Promise<void>;
  updateMentorApplication(req: Request, res: Response): Promise<void>
  getMentorsForStud(req: Request, res: Response): Promise<void>;
}
