import { IUserCommunityController } from "entities/controllerInterfaces/user/communityController.interface";
import { IGetEnrolledCommunitiesUsecase } from "entities/usecaseInterfaces/community/getEnrolledCommunitiesUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class UserCommunityController implements IUserCommunityController {
  constructor(
    @inject("IGetEnrolledCommunitiesUsecase")
    private _getEnrolledCommunitiesUsecase: IGetEnrolledCommunitiesUsecase
  ) {}

  async getAllCommunities(
    req: Request,
    res: Response,
  ): Promise<void> {
    const {currentPage,limit}=req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;
    const data = await this._getEnrolledCommunitiesUsecase.execute(
      userId,
      currentPage,
      limit
    );
    res.status(HTTP_STATUS.OK).json(data);
  }
}
