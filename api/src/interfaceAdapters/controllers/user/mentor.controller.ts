import { IUserMentorController } from "entities/controllerInterfaces/user/mentorController.interface";
import { IGetMentorsForStudUsecase } from "entities/usecaseInterfaces/mentor/getMentorsForStudUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { GetMentorsForStudReqDTO } from "shared/dto/request/mentor.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserMentorController implements IUserMentorController {
  constructor(
     @inject("IGetMentorsForStudUsecase")
    private _getMentorsForStudUsecase: IGetMentorsForStudUsecase,
  ) {}

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
