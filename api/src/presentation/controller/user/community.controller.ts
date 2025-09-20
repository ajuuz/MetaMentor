import { IUserCommunityController } from "application/interfaces/controller/user/communityController.interface";
import { IGetEnrolledCommunitiesUsecase } from "application/usecase/interfaces/community/getEnrolledCommunitiesUsecase.interface";
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

  async getAllCommunities(req: Request, res: Response): Promise<void> {
    const { currentPage, limit } = req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;
    const data = await this._getEnrolledCommunitiesUsecase.execute(
      userId,
      currentPage,
      limit
    );
    res.status(HTTP_STATUS.OK).json(data);
  }
}
