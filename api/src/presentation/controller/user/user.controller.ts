import { IUserController } from "application/interfaces/controller/user/userController.interface";
import { IGetSpecificUserUsecase } from "application/usecase/interfaces/user/getSpecificUserUsecase.interface";
import { IUpdateUserUsecase } from "application/usecase/interfaces/user/updateUserUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { UpdateUserDetailsReqDTO } from "application/dto/requset/user.dto";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class UserController implements IUserController {
  constructor(
    @inject("IGetSpecificUserUsecase")
    private _getSpecificUserUsecase: IGetSpecificUserUsecase,

    @inject("IUpdateUserUsecase")
    private _updateUserUsecase: IUpdateUserUsecase
  ) {}

  async getDetails(req: Request, res: Response): Promise<void> {
    const userId = (req as ModifiedRequest).user.id;
    const user = await this._getSpecificUserUsecase.execute(userId);
    res.status(HTTP_STATUS.OK).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const updationData: UpdateUserDetailsReqDTO = req.verifiedData;
    const userId: string = (req as ModifiedRequest).user.id;
    await this._updateUserUsecase.execute(userId, updationData);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "profile updated successfully" });
  }
}
