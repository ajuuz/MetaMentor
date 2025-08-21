import { IMentorReviewController } from "entities/controllerInterfaces/mentor/reviewController.interface";
import { IGetMentorReviewsUsecase } from "entities/usecaseInterfaces/review/getMentorReviewsUsecase.interface";
import { IGetReviewForMentorUsecase } from "entities/usecaseInterfaces/review/getReviewForMentorUsecase.interface";
import { ISubmitReviewFeedBackUsecase } from "entities/usecaseInterfaces/review/submitReviewFeedBackUsecase.interface";
import { ICancelReviewByMentorUsecase } from "entities/usecaseInterfaces/review/cancelReviewByMentorUsecase.interface";
import { NextFunction, Request, Response } from "express";
import {
  HTTP_STATUS,
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
  REVIEW_STATUS,
  SUCCESS_MESSAGE,
} from "shared/constants";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class MentorReviewController implements IMentorReviewController {
  constructor(
    @inject("IGetMentorReviewsUsecase")
    private _getMentorReviewsUsecase: IGetMentorReviewsUsecase,

    @inject("IGetReviewForMentorUsecase")
    private _getReviewForMentorUsecase: IGetReviewForMentorUsecase,

    @inject("ICancelReviewByMentorUsecase")
    private _cancelReviewByMentorUsecase: ICancelReviewByMentorUsecase,

    @inject("ISubmitReviewFeedBackUsecase")
    private _submitReviewFeedBackUsecase: ISubmitReviewFeedBackUsecase
  ) {}

  async getAllReviews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const mentorId = (req as ModifiedRequest).user.id;
    const status = req.query.status as REVIEW_FILTER_STATUS;
    const pendingReviewState = req.query.pendingReviewState as
      | PENDING_REVIEW_STATE
      | undefined;
    const dateRange = req.query.dateRange as string;
    const currentPage: number = Number(req.query.currentPage ?? "1");
    const limit: number = Number(req.query.limit ?? "10");

    const data = await this._getMentorReviewsUsecase.execute(
      mentorId,
      status,
      dateRange,
      currentPage,
      limit,
      pendingReviewState
    );
    res.status(HTTP_STATUS.OK).json(data);
  }

  async getReview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const reviewId: string = req.params.reviewId;
    const mentorId: string = (req as ModifiedRequest)?.user?.id;
    if (!reviewId || !mentorId) throw new ValidationError();
    const review = await this._getReviewForMentorUsecase.execute(
      mentorId,
      reviewId
    );
    res.status(HTTP_STATUS.OK).json(review);
  }

  async updateReviewStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const status = req.body.status;
    const reviewId: string = req.params.reviewId;
    const mentorId: string = (req as ModifiedRequest)?.user?.id;
    const feedBack: string = req.body.feedBack;
    if (!status || !reviewId || !mentorId) throw new ValidationError();

    if (status === REVIEW_STATUS.CANCELLED) {
      await this._cancelReviewByMentorUsecase.execute(
        mentorId,
        reviewId,
        status
      );
    } else {
      await this._submitReviewFeedBackUsecase.execute(
        mentorId,
        reviewId,
        status,
        feedBack
      );
    }
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGE.REVIEWS.UPDATE_STATUS });
  }
}
