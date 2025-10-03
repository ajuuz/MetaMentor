import { IUserCommunityController } from "application/interfaces/controller/user/communityController.interface";
import { IGetEnrolledCommunitiesUsecase } from "application/usecase/interfaces/community/getEnrolledCommunitiesUsecase.interface";
import { IGetCommunityChatsUsecase } from "application/usecase/interfaces/communityChat/getCommunityChatsUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class UserCommunityController implements IUserCommunityController {
  constructor(
    @inject("IGetEnrolledCommunitiesUsecase")
    private _getEnrolledCommunitiesUsecase: IGetEnrolledCommunitiesUsecase,
    @inject("IGetCommunityChatsUsecase")
    private _getCommunityChatsUsecase: IGetCommunityChatsUsecase
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

  async getCommunityChat(req: Request, res: Response): Promise<void> {
    const communityId = req.params.communityId;
    const data = await this._getCommunityChatsUsecase.execute(communityId,50);
    res.status(HTTP_STATUS.OK).json(data);
  }
}
