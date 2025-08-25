import { IMentorReviewController } from "entities/controllerInterfaces/mentor/reviewController.interface";
import { IGetMentorReviewsUsecase } from "entities/usecaseInterfaces/review/getMentorReviewsUsecase.interface";
import { IGetReviewForMentorUsecase } from "entities/usecaseInterfaces/review/getReviewForMentorUsecase.interface";
import { ISubmitReviewResultUsecase } from "entities/usecaseInterfaces/review/submitReviewFeedBackUsecase.interface";
import { ICancelReviewByMentorUsecase } from "entities/usecaseInterfaces/review/cancelReviewByMentorUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";
import {
  CancelReviewByMentorReqDTO,
  GetReviewsForMentorReqDTO,
  GetReviewForMentorReqDTO,
  SubmitReviewResultReqDTO,
} from "shared/dto/request/review.dto";

@injectable()
export class MentorReviewController implements IMentorReviewController {
  constructor(
    @inject("IGetMentorReviewsUsecase")
    private _getMentorReviewsUsecase: IGetMentorReviewsUsecase,

    @inject("IGetReviewForMentorUsecase")
    private _getReviewForMentorUsecase: IGetReviewForMentorUsecase,

    @inject("ICancelReviewByMentorUsecase")
    private _cancelReviewByMentorUsecase: ICancelReviewByMentorUsecase,

    @inject("ISubmitReviewResultUsecase")
    private _submitReviewResultUsecase: ISubmitReviewResultUsecase
  ) {}

  async getAllReviews(req: Request, res: Response): Promise<void> {
    const {
      status,
      pendingReviewState,
      dateRange,
      currentPage,
      limit,
    }: GetReviewsForMentorReqDTO = req.verifiedData;
    const mentorId = (req as ModifiedRequest).user.id;

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

  async getReview(req: Request, res: Response): Promise<void> {
    const { reviewId }: GetReviewForMentorReqDTO = req.verifiedData;

    const mentorId: string = (req as ModifiedRequest)?.user?.id;

    const review = await this._getReviewForMentorUsecase.execute(
      mentorId,
      reviewId
    );
    res.status(HTTP_STATUS.OK).json(review);
  }

  async cancelReview(req: Request, res: Response): Promise<void> {
    const { reviewId }: CancelReviewByMentorReqDTO = req.verifiedData;
    const mentorId: string = (req as ModifiedRequest).user.id;
    try {
      await this._cancelReviewByMentorUsecase.execute(mentorId, reviewId);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGE.REVIEWS.CANCEL_REVIEW_BY_MENTOR,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async submitReviewResult(req: Request, res: Response): Promise<void> {
    const mentorId: string = (req as ModifiedRequest)?.user?.id;
    const reviewResultDetails: SubmitReviewResultReqDTO = req.verifiedData;
    console.log(reviewResultDetails);

    await this._submitReviewResultUsecase.execute(
      mentorId,
      reviewResultDetails
    );
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGE.REVIEWS.UPDATE_STATUS });
  }
}
