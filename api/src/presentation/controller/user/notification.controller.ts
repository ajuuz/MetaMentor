import { IUserNotificationController } from "application/interfaces/controller/user/notificationController.interface";
import { IGetNotificationUsecase } from "application/usecase/interfaces/notification/getNotificationUsecase.interface";
import { IMarkAsReadUsecase } from "application/usecase/interfaces/notification/markAsReadUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class UserNotificationController implements IUserNotificationController {
  constructor(
    @inject("IGetNotificationUsecase")
    private _getNotificationUsecase: IGetNotificationUsecase,
    @inject("IMarkAsReadUsecase")
    private _markAsReadUsecase: IMarkAsReadUsecase
  ) {}

  async getNotifications(req: Request, res: Response): Promise<void> {
    const userId = (req as ModifiedRequest).user.id;
    const filter = req.query.filter as "all" | "unRead";
    const notifications = await this._getNotificationUsecase.execute(
      userId,
      filter!
    );
    res.status(HTTP_STATUS.OK).json(notifications);
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    const userId = (req as ModifiedRequest).user.id;
    await this._markAsReadUsecase.execute(userId);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "All notification read successfully" });
  }
}
