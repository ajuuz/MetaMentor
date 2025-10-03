import { IUserReviewController } from "application/interfaces/controller/user/userReviewController.interface";
import { ICancelReviewByStudentUsecase } from "application/usecase/interfaces/review/cancelReviewByStudentUsecase.interface";
import { IGetReviewByDayForStudUsecase } from "application/usecase/interfaces/review/getReviewByDayForStudUsecase.interface";
import { IGetReviewForStudentUsecase } from "application/usecase/interfaces/review/getReviewForStudentUsecase.interface";
import { IGetReviewsForStudentUsecase } from "application/usecase/interfaces/review/getReviewsForStudentUsecase.interface";
import { IRescheduleReviewByStudentUsecase } from "application/usecase/interfaces/review/rescheduleReviewByStudentUsecase.interface";
import { IReviewCountUsecase } from "application/usecase/interfaces/review/reviewCountUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, ROLES, SUCCESS_MESSAGE } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class UserReviewController implements IUserReviewController {
  constructor(
    @inject("IGetReviewsForStudentUsecase")
    private _getReviewsForStudentUsecase: IGetReviewsForStudentUsecase,

    @inject("IGetReviewForStudentUsecase")
    private _getReviewForStudentUsecase: IGetReviewForStudentUsecase,

    @inject("IGetReviewByDayForStudUsecase")
    private _getReviewByDayForStudUsecase: IGetReviewByDayForStudUsecase,

    @inject("ICancelReviewByStudentUsecase")
    private _cancelReviewByStudentUsecase: ICancelReviewByStudentUsecase,

    @inject("IRescheduleReviewByStudentUsecase")
    private _rescheduleReviewByStudentUsecase: IRescheduleReviewByStudentUsecase,

    @inject("IReviewCountUsecase")
    private _reviewCountUsecase: IReviewCountUsecase
  ) {}

  async getAllReviews(req: Request, res: Response): Promise<void> {
    const { status, pendingReviewState, dateRange, currentPage, limit } =
      req.verifiedData;

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

  async getSpecificReview(req: Request, res: Response): Promise<void> {
    const { reviewId } = req.verifiedData;

    const studentId: string = (req as ModifiedRequest)?.user?.id;

    const review = await this._getReviewForStudentUsecase.execute(
      studentId,
      reviewId
    );
    res.status(HTTP_STATUS.OK).json(review);
  }

  async getReviewsByDay(req: Request, res: Response): Promise<void> {
    const { mentorId, date } = req.verifiedData;
    const data = await this._getReviewByDayForStudUsecase.execute(
      mentorId,
      date
    );
    res.status(HTTP_STATUS.OK).json(data[0]);
  }

  async cancelReview(req: Request, res: Response): Promise<void> {
    const { reviewId } = req.verifiedData;
    const studentId: string = (req as ModifiedRequest)?.user?.id;

    await this._cancelReviewByStudentUsecase.execute(studentId, reviewId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.REVIEWS.CANCEL_REVIEW_BY_STUDENT,
    });
  }

  async rescheduleReview(req: Request, res: Response): Promise<void> {
    const rescheduleDetails = req.verifiedData;
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

  async getReviewCounts(req: Request, res: Response): Promise<void> {
    const studentId: string = (req as ModifiedRequest)?.user?.id;

    const counts = await this._reviewCountUsecase.execute(
      ROLES.USER,
      studentId
    );
    res.status(HTTP_STATUS.OK).json(counts);
  }

  async getDomainReviews(req: Request, res: Response): Promise<void> {
    // const
  }
}
