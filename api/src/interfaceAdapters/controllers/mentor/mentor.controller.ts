import { IMentorController } from "entities/controllerInterfaces/mentor/mentorController.interface";
import { IGetAllDomainsNameAndIdUsecase } from "entities/usecaseInterfaces/domain/getDomainsNameAndIdUsecase.interface";
import { ICreateMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/createMentorApplicationUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { CreateMentorApplicationReqDTO } from "shared/dto/request/mentor.dto";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class MentorController implements IMentorController {
  constructor(
    @inject("ICreateMentorApplicationUsecase")
    private _createMentorApplicationUsecase: ICreateMentorApplicationUsecase
  ) {}
  async registerForm(req: Request, res: Response): Promise<void> {
    const mentorDetails: CreateMentorApplicationReqDTO = req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;
    await this._createMentorApplicationUsecase.execute(userId, mentorDetails);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: "mentor registered successfully" });
  }
}
