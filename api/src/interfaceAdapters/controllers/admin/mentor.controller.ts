import { IAdminMentorController } from "entities/controllerInterfaces/admin/adminMentorController.interface";
import { IAcceptMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/acceptMentorApplicationUsecase.interface";
import { IGetNotVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getNotVerifiedMentorsUsecase.interface";
import { IGetSpecificMentorUsecase } from "entities/usecaseInterfaces/mentor/getSpecificMentorUsecase.interface";
import { IGetVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getVerifiedMentors.interface";
import { IRejectMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/rejectMentorApplication.interface";
import { IUpdateMentorStatusUsecase } from "entities/usecaseInterfaces/mentor/updateMentorStatusUsecase.interface";
import { NextFunction, Request, Response } from "express";
import sseClientManager from "frameworks/SSE/sseClientManager";
import { HTTP_STATUS, MENTOR_APPLICATION_STATUS } from "shared/constants";
import {
  GetAllMentorsReqDTO,
  GetSpecificMentorReqDTO,
  MentorApplicationVerificationReqDTO,
  UpdateMentorStatusReqDTO,
} from "shared/dto/request/mentor.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminMentorController implements IAdminMentorController {
  constructor(
    @inject("IGetNotVerifiedMentorsUsecase")
    private _getNotVerifiedMentorsUsecase: IGetNotVerifiedMentorsUsecase,

    @inject("IGetVerifiedMentorsUsecase")
    private _getVerifiedMentorsUsecase: IGetVerifiedMentorsUsecase,

    @inject("IGetSpecificMentorUsecase")
    private _getSpecificMentorUsecase: IGetSpecificMentorUsecase,

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
      selectedDomains
    }: GetAllMentorsReqDTO = req.verifiedData;
    let usecase: IGetNotVerifiedMentorsUsecase | IGetVerifiedMentorsUsecase;
    if (!isVerified) {
      usecase = this._getNotVerifiedMentorsUsecase;
    } else {
      usecase = this._getVerifiedMentorsUsecase;
    }
    try {
      const data = await usecase.execute(
        currentPage,
        limit,
        sortBy!,
        searchTerm!,
        selectedDomains
      );
      res.status(HTTP_STATUS.OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  async getSpecificMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { mentorId }: GetSpecificMentorReqDTO = req.verifiedData;
    try {
      const mentor = await this._getSpecificMentorUsecase.execute(mentorId);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "mentor fetched successfully",
        data: mentor,
      });
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
