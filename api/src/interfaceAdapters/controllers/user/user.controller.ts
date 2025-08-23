import { IUserController } from "entities/controllerInterfaces/user/userController.interface";
import { IGetSpecificUserUsecase } from "entities/usecaseInterfaces/user/getSpecificUserUsecase.interface";
import { IUpdateUserUsecase } from "entities/usecaseInterfaces/user/updateUserUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { UpdateUserDetailsReqDTO } from "shared/dto/request/user.dto";
import { UserDetailsResponseDTO } from "shared/dto/userDTO";
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
    const user: UserDetailsResponseDTO =
      await this._getSpecificUserUsecase.execute(userId);
    res.status(HTTP_STATUS.OK).json(user);
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const updationData:UpdateUserDetailsReqDTO= req.verifiedData;
    const userId: string = (req as ModifiedRequest).user.id;
    await this._updateUserUsecase.execute(userId, updationData);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: "profile updated successfully" });
  }
}
