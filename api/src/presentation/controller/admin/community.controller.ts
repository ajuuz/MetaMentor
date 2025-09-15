import { IAdminCommunityController } from "application/interfaces/controller/admin/communityController.interface";
import { IGetCommunitiesUsecase } from "application/usecase/interfaces/community/getCommunitiesUsecase.interface";
import { IUpdateCommunityStatusUsecase } from "application/usecase/interfaces/community/updateCommunityUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import {
  GetCommunitiesForAdminReqDTO,
  UpdateCommunityStatusDTO,
} from "shared/dto/request/community.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminCommunityController implements IAdminCommunityController {
  constructor(
    @inject("IGetCommunitiesUsecase")
    private _getCommunitiesUsecase: IGetCommunitiesUsecase,

    @inject("IUpdateCommunityStatusUsecase")
    private _updateCommunityStatusUsecase: IUpdateCommunityStatusUsecase
  ) {}

  async getAllCommunities(req: Request, res: Response): Promise<void> {
    const {
      currentPage,
      limit,
      sortBy,
      searchTerm,
    }: GetCommunitiesForAdminReqDTO = req.verifiedData;

    const data = await this._getCommunitiesUsecase.execute(
      currentPage,
      limit,
      sortBy!,
      searchTerm!
    );
    res.status(HTTP_STATUS.OK).json(data);
  }

  async updateCommunityStatus(req: Request, res: Response): Promise<void> {
    const { communityId, status }: UpdateCommunityStatusDTO = req.verifiedData;
    await this._updateCommunityStatusUsecase.execute(communityId, status);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.COMMUNITY.UPDATE_STATUS,
    });
  }
}
