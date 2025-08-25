import { IMentorController } from "entities/controllerInterfaces/mentor/mentorController.interface";
import { IGetAllDomainsNameAndIdUsecase } from "entities/usecaseInterfaces/domain/getDomainsNameAndIdUsecase.interface";
import { IRegisterMentorUsecase } from "entities/usecaseInterfaces/mentor/registerMentorUsecase.interface";
import {  Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { ApplyForMentorReqDTO } from "shared/dto/request/mentor.dto";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class MentorController implements IMentorController {
  constructor(
    @inject("IRegisterMentorUsecase")
    private _registerMentorUsecase: IRegisterMentorUsecase,

    @inject("IGetAllDomainsNameAndIdUsecase")
    private _getAllDomainsNameAndIdUsecase: IGetAllDomainsNameAndIdUsecase
  ) {}
  async registerForm(
    req: Request,
    res: Response,
  ): Promise<void> {
    const mentorDetails: ApplyForMentorReqDTO = req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;
    await this._registerMentorUsecase.execute(userId, mentorDetails);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: "mentor registered successfully" });
  }

  async getDomains(
    req: Request,
    res: Response,
  ): Promise<void> {
    const domains = await this._getAllDomainsNameAndIdUsecase.execute();
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.DOMAINS.FETCH_ALL,
      data: domains,
    });
  }
}
