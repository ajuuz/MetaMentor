import { IMentorController } from "entities/controllerInterfaces/mentor/mentorController.interface";
import { ICreateMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/createMentorApplicationUsecase.interface";
import { IGetProfessionalDetailsUsecase } from "entities/usecaseInterfaces/mentor/getProfessionalDetailsUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { CreateMentorApplicationReqDTO } from "shared/dto/request/mentor.dto";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class MentorController implements IMentorController {
  constructor(
    @inject("ICreateMentorApplicationUsecase")
    private _createMentorApplicationUsecase: ICreateMentorApplicationUsecase,

    @inject("IGetProfessionalDetailsUsecase")
    private _getProfessionalDetailsUsecase: IGetProfessionalDetailsUsecase
  ) {}
  async registerForm(req: Request, res: Response): Promise<void> {
    const mentorDetails: CreateMentorApplicationReqDTO = req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;
    await this._createMentorApplicationUsecase.execute(userId, mentorDetails);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: "mentor registered successfully" });
  }


  async getProfessionalDetails(req:Request,res:Response):Promise<void>{
    const userId=(req as ModifiedRequest).user.id;
    const data=await this._getProfessionalDetailsUsecase.execute(userId)
    res.status(201).json(data);
  }
}
