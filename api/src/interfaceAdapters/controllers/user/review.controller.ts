import { IUserReviewController } from "entities/controllerInterfaces/user/userReviewController.interface";
import { ICancelReviewByStudentUsecase } from "entities/usecaseInterfaces/review/cancelReviewByStudentUsecase.interface";
import { IGetReviewsForStudentUsecase } from "entities/usecaseInterfaces/review/getReviewsForStudentUsecase.interface";
import { IGetStudentReviewsUsecase } from "entities/usecaseInterfaces/review/getStudentReviewsUsecase.interface";
import { Request, Response } from "express";
import {
  HTTP_STATUS,
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
  SUCCESS_MESSAGE,
} from "shared/constants";
import { ModifiedRequest } from "type/types";
import { inject, injectable } from "tsyringe";
import { CancelReviewByStudReqDTO, GetAllReviewsForStudReqDTO } from "shared/dto/request/review.dto";

@injectable()
export class UserReviewController implements IUserReviewController {
  constructor(
    @inject("IGetStudentReviewsUsecase")
    private _getStudentReviewsUsecase: IGetStudentReviewsUsecase,

    @inject("IGetReviewsForStudentUsecase")
    private _getReviewsForStudentUsecase: IGetReviewsForStudentUsecase,

    @inject("ICancelReviewByStudentUsecase")
    private _cancelReviewByStudentUsecase: ICancelReviewByStudentUsecase
  ) {}

  // async getStudentReviews(
  //   req: Request,
  //   res: Response,
  // ): Promise<void> {
  //   console.log(req.verifiedData)
  //   const type = req.query.type as "upcoming" | "completed";
  //   const studentId = (req as ModifiedRequest).user.id;
  //   const reviews = await this._getStudentReviewsUsecase.execute(
  //     studentId,
  //     type
  //   );
  //   res.status(200).json(reviews);
  // }

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

  async cancelReview(req: Request, res: Response): Promise<void> {
    const {reviewId}: CancelReviewByStudReqDTO = req.verifiedData;
    const studentId: string = (req as ModifiedRequest)?.user?.id;

    await this._cancelReviewByStudentUsecase.execute(studentId, reviewId);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.REVIEWS.STUDENT_CANCEL_REVIEW,
    });
  }

  async getDomainReviews(req: Request, res: Response): Promise<void> {
    // const
  }
}
