import { IUserReviewController } from "application/interfaces/controller/user/userReviewController.interface";
import { ICancelReviewByStudentUsecase } from "application/usecase/interfaces/review/cancelReviewByStudentUsecase.interface";
import { IGetReviewsForStudentUsecase } from "application/usecase/interfaces/review/getReviewsForStudentUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { ModifiedRequest } from "type/types";
import { inject, injectable } from "tsyringe";
import {
  CancelReviewByStudReqDTO,
  GetAllReviewsForStudReqDTO,
  GetReviewByDayForStudReqDTO,
  RescheduleReviewByStudReqDTO,
} from "shared/dto/request/review.dto";
import { IGetReviewByDayForStudUsecase } from "application/usecase/interfaces/review/getReviewByDayForStudUsecase.interface";
import { IRescheduleReviewByStudentUsecase } from "application/usecase/interfaces/review/rescheduleReviewByStudentUsecase.interface";

@injectable()
export class UserReviewController implements IUserReviewController {
  constructor(
    @inject("IGetReviewsForStudentUsecase")
    private _getReviewsForStudentUsecase: IGetReviewsForStudentUsecase,

    @inject("IGetReviewByDayForStudUsecase")
    private _getReviewByDayForStudUsecase: IGetReviewByDayForStudUsecase,

    @inject("ICancelReviewByStudentUsecase")
    private _cancelReviewByStudentUsecase: ICancelReviewByStudentUsecase,

    @inject("IRescheduleReviewByStudentUsecase")
    private _rescheduleReviewByStudentUsecase: IRescheduleReviewByStudentUsecase
  ) {}

  async getAllReviews(req: Request, res: Response): Promise<void> {
    const {
      status,
      pendingReviewState,
      dateRange,
      currentPage,
      limit,
    }: GetAllReviewsForStudReqDTO = req.verifiedData;

    const studentId = (req as ModifiedRequest).user.id;

    const data = await this._getReviewsForStudentUsecase.execute(
      studentId,
      status,
      dateRange,
      currentPage,
      limit,
      pendingReviewState
    );
    res.status(HTTP_STATUS.OK).json(data);
  }

  async getReviewsByDay(req: Request, res: Response): Promise<void> {
    const { mentorId, date }: GetReviewByDayForStudReqDTO = req.verifiedData;
    const data = await this._getReviewByDayForStudUsecase.execute(
      mentorId,
      date
    );
    res.status(HTTP_STATUS.OK).json(data[0]);
  }

  async cancelReview(req: Request, res: Response): Promise<void> {
    const { reviewId }: CancelReviewByStudReqDTO = req.verifiedData;
    const studentId: string = (req as ModifiedRequest)?.user?.id;

    await this._cancelReviewByStudentUsecase.execute(studentId, reviewId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.REVIEWS.CANCEL_REVIEW_BY_STUDENT,
    });
  }

  async rescheduleReview(req: Request, res: Response): Promise<void> {
    const rescheduleDetails: RescheduleReviewByStudReqDTO = req.verifiedData;
    const studentId: string = (req as ModifiedRequest)?.user?.id;

    await this._rescheduleReviewByStudentUsecase.execute(
      studentId,
      rescheduleDetails
    );
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.REVIEWS.RESCHEDULE,
    });
  }

  async getDomainReviews(req: Request, res: Response): Promise<void> {
    // const
  }
}
