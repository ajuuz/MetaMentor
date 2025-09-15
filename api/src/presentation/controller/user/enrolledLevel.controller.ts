import { IUserEnrolledLevelController } from "application/interfaces/controller/user/enrolledLevelController.interface";
import { ISaveLevelAssignmentUsecase } from "application/usecase/interfaces/enrolledLevel/saveLevelAssignmentUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserEnrolledLevelController
  implements IUserEnrolledLevelController
{
  constructor(
    @inject("ISaveLevelAssignmentUsecase")
    private _saveLevelAssignmentUsecase: ISaveLevelAssignmentUsecase
  ) {}

  async saveLevelAssignments(req: Request, res: Response): Promise<void> {
    const { enrolledLevelId, assignments } =
      req.verifiedData;
    await this._saveLevelAssignmentUsecase.execute(
      enrolledLevelId,
      assignments
    );
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.LEVEL.SUBMIT_ASSIGNMENT,
    });
  }
}
