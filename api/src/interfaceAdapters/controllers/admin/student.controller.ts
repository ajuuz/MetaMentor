import { IAdminStudentController } from "entities/controllerInterfaces/admin/adminStudentController.interface";
import { IGetAllStudentsUsecase } from "entities/usecaseInterfaces/student/getAllStudentsUsecase.interface";
import { IUpdateStudentStatusUsecase } from "entities/usecaseInterfaces/student/updateStudentStatusUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { GetAllStudentResponseDTO } from "shared/dto/studentDTO";
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
      const currentPage: number = Number(req.query.currentPage ?? "1");
      const limit: number = Number(req.query.limit ?? "10");
      const data: Omit<GetAllStudentResponseDTO, "totalDocuments"> =
        await this._getAllStudentsUsecase.execute(currentPage, +limit);
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
    const userId = req.params.userId as string;
    const status: boolean = req.body.status;
    try {
      await this._updateStudentStatusUsecase.execute(userId, status);
      res
        .status(HTTP_STATUS.OK)
        .json({
          success: true,
          message: SUCCESS_MESSAGE.STUDENT.STATUS_UPDATE,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
