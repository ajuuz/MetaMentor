import { IAdminMentorController } from "application/interfaces/controller/admin/adminMentorController.interface";
import { IAcceptMentorApplicationUsecase } from "application/usecase/interfaces/mentor/acceptMentorApplicationUsecase.interface";
import { IGetMentorsForAdminUsecase } from "application/usecase/interfaces/mentor/getMentorsForAdmin.interface";
import { IGetMentorApplicationDetailsUsecase } from "application/usecase/interfaces/mentor/getMentorApplicationDetailsUsecase.interface";
import { IRejectMentorApplicationUsecase } from "application/usecase/interfaces/mentor/rejectMentorApplication.interface";
import { IUpdateMentorStatusUsecase } from "application/usecase/interfaces/mentor/updateMentorStatusUsecase.interface";
import { NextFunction, Request, Response } from "express";
import sseClientManager from "infrastructure/config/sse/sseClientManager.config";
import { HTTP_STATUS, MENTOR_APPLICATION_STATUS } from "shared/constants";
import {
  GetAllMentorsReqDTO,
  GetSpecificMentorReqDTO,
  MentorApplicationVerificationReqDTO,
  UpdateMentorStatusReqDTO,
} from "application/dto/requset/mentor.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminMentorController implements IAdminMentorController {
  constructor(
    @inject("IGetMentorsForAdminUsecase")
    private _getMentorsForAdminUsecase: IGetMentorsForAdminUsecase,

    @inject("IGetMentorApplicationDetailsUsecase")
    private _getMentorApplicationDetailsUsecase: IGetMentorApplicationDetailsUsecase,

    @inject("IAcceptMentorApplicationUsecase")
    private _acceptMentorApplicationUsecase: IAcceptMentorApplicationUsecase,

    @inject("IRejectMentorApplicationUsecase")
    private _rejectMentorApplicationUsecase: IRejectMentorApplicationUsecase,

    @inject("IUpdateMentorStatusUsecase")
    private _updateMentorStatusUsecase: IUpdateMentorStatusUsecase
  ) {}

  async getAllMentors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      currentPage,
      limit,
      isVerified,
      sortBy,
      searchTerm,
      selectedDomains,
    }: GetAllMentorsReqDTO = req.verifiedData;
    try {
      const data = await this._getMentorsForAdminUsecase.execute(
        isVerified,
        sortBy,
        searchTerm,
        selectedDomains,
        currentPage,
        limit
      );
      res.status(HTTP_STATUS.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getMentorApplicationDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { mentorId }: GetSpecificMentorReqDTO = req.verifiedData;
    try {
      const data = await this._getMentorApplicationDetailsUsecase.execute(
        mentorId
      );
      res.status(HTTP_STATUS.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async mentorApplicationVerification(
    req: Request,
    res: Response
  ): Promise<void> {
    const {
      mentorId,
      applicationStatus,
      email,
      reason,
    }: MentorApplicationVerificationReqDTO = req.verifiedData;

    if (applicationStatus === MENTOR_APPLICATION_STATUS.ACCEPTED) {
      await this._acceptMentorApplicationUsecase.execute(mentorId, email);
      sseClientManager.notifyClient(email, "Mentor Application Accepted");
      res.status(200).json({
        success: true,
        message: "Mentor Application Accepted Successfully",
      });
    } else if (
      applicationStatus === MENTOR_APPLICATION_STATUS.REJECTED &&
      reason
    ) {
      await this._rejectMentorApplicationUsecase.execute(
        mentorId,
        email,
        reason
      );
      res.status(200).json({
        success: true,
        message: "Mentor Application Rejected Successfully",
      });
    }
  }

  async updateMentorStatus(req: Request, res: Response): Promise<void> {
    const { mentorId, status }: UpdateMentorStatusReqDTO = req.verifiedData;
    await this._updateMentorStatusUsecase.execute(mentorId, status);
    res.status(200).json({
      success: true,
      message: `mentor ${status ? "blocked" : "unblocked"} successfully`,
    });
  }
}
