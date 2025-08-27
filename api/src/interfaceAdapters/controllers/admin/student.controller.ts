import { IAdminStudentController } from "entities/controllerInterfaces/admin/adminStudentController.interface";
import { IGetAllStudentsUsecase } from "entities/usecaseInterfaces/student/getAllStudentsUsecase.interface";
import { IUpdateStudentStatusUsecase } from "entities/usecaseInterfaces/student/updateStudentStatusUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import {
  GetAllStudentReqDTO,
  UpdateStudentStatusReqDTO,
} from "shared/dto/request/student.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminStudentController implements IAdminStudentController {
  constructor(
    @inject("IGetAllStudentsUsecase")
    private _getAllStudentsUsecase: IGetAllStudentsUsecase,

    @inject("IUpdateStudentStatusUsecase")
    private _updateStudentStatusUsecase: IUpdateStudentStatusUsecase
  ) {}

  async getAllStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const fetchDetails: GetAllStudentReqDTO = req.verifiedData;
      const data = await this._getAllStudentsUsecase.execute(fetchDetails);
      res.status(HTTP_STATUS.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async updateStudentStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, status }: UpdateStudentStatusReqDTO = req.verifiedData;
    try {
      await this._updateStudentStatusUsecase.execute(userId, status);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGE.STUDENT.STATUS_UPDATE,
      });
    } catch (error) {
      next(error);
    }
  }
}
