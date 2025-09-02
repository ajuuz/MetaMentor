import { IFcmTokenController } from "entities/controllerInterfaces/common/fcmTokenController.interface";
import { ISaveFcmTokenUsecase } from "entities/usecaseInterfaces/fcmToken/saveFcmTokenUsecase.interface";
import {  Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class FcmTokenController implements IFcmTokenController {
  constructor(
    @inject("ISaveFcmTokenUsecase")
    private _saveFcmTokenUsecase: ISaveFcmTokenUsecase
  ) {}
  async saveFcmToken(
    req: Request,
    res: Response,
  ): Promise<void> {
    const userId: string = (req as ModifiedRequest).user.id;
    const fcmToken: string = req.body.fcmToken;

    await this._saveFcmTokenUsecase.execute(userId, fcmToken);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: "fcm token saved successfully" });
  }
}
