import { Request, Response } from "express";

export interface IFcmTokenController {
  saveFcmToken(req: Request, res: Response): Promise<void>;
}
