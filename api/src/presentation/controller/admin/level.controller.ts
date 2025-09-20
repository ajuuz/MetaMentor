import { IAdminLevelController } from "application/interfaces/controller/admin/levelController.interface";
import { IUpdateLevelStatusUsecase } from "application/usecase/interfaces/level/updateLevelStatusUsecase.interface";
import { Request, Response } from "express";
import { SUCCESS_MESSAGE } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminLevelController implements IAdminLevelController {
  constructor(
    @inject("IUpdateLevelStatusUsecase")
    private _updateLevelStatusUsecase: IUpdateLevelStatusUsecase
  ) {}

  async updateLevelStatus(req: Request, res: Response): Promise<void> {
    const { levelId, status } = req.verifiedData;
    await this._updateLevelStatusUsecase.execute(levelId, status);
    res
      .status(200)
      .json({ success: true, message: SUCCESS_MESSAGE.LEVEL.UPDATE_STATUS });
  }
}
