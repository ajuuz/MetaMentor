import { IUserMentorController } from "application/interfaces/controller/user/mentorController.interface";
import { IGetMentorsForStudUsecase } from "application/usecase/interfaces/mentor/getMentorsForStudUsecase.interface";
import { IGetMentorApplicationDetailsUsecase } from "application/usecase/interfaces/mentor/getMentorApplicationDetailsUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import {
  GetMentorsForStudReqDTO,
  UpdateMentorApplicationReqDTO,
} from "application/dto/requset/mentor.dto";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";
import { IUpdateMentorApplicationUsecase } from "application/usecase/interfaces/mentor/updateMentorApplicationUsecase.interface";

@injectable()
export class UserMentorController implements IUserMentorController {
  constructor(
    @inject("IGetMentorApplicationDetailsUsecase")
    private _getMentorApplicationDetailsUsecase: IGetMentorApplicationDetailsUsecase,

    @inject("IUpdateMentorApplicationUsecase")
    private _updateMentorApplicationUsecase: IUpdateMentorApplicationUsecase,

    @inject("IGetMentorsForStudUsecase")
    private _getMentorsForStudUsecase: IGetMentorsForStudUsecase
  ) {}

  async getMentorApplicationDetails(
    req: Request,
    res: Response
  ): Promise<void> {
    const mentorId = (req as ModifiedRequest).user.id;

    const data = await this._getMentorApplicationDetailsUsecase.execute(
      mentorId
    );
    res.status(HTTP_STATUS.OK).json(data);
  }

  async updateMentorApplication(req: Request, res: Response): Promise<void> {
    const mentorDetails: UpdateMentorApplicationReqDTO = req.verifiedData;
    const mentorId = (req as ModifiedRequest).user.id;
    await this._updateMentorApplicationUsecase.execute(mentorId, mentorDetails);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "mentor Application Updated successfully",
    });
  }

  async getMentorsForStud(req: Request, res: Response): Promise<void> {
    const {
      currentPage,
      limit,
      sortBy,
      searchTerm,
      selectedDomains,
    }: GetMentorsForStudReqDTO = req.verifiedData;

    const data = await this._getMentorsForStudUsecase.execute(
      sortBy,
      searchTerm,
      selectedDomains,
      currentPage,
      limit
    );
    res.status(HTTP_STATUS.OK).json(data);
  }
}
