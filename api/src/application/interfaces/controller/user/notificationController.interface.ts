import { Request, Response } from "express";

export interface IUserNotificationController {
  getNotifications(req: Request, res: Response): Promise<void>;
  markAsRead(req: Request, res: Response): Promise<void>;
}
