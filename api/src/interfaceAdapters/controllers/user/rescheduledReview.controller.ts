import { IUserRescheduledReviewController } from "entities/controllerInterfaces/user/rescheduledReviewController.interface";
import { IGetRescheduledReviewUsecase } from "application/usecase/interfaces/rescheduledReview/getRescheduledReviewUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserRescheduledReviewController
  implements IUserRescheduledReviewController
{
  constructor(
    @inject("IGetRescheduledReviewUsecase")
    private _getRescheduledReviewUsecase: IGetRescheduledReviewUsecase
  ) {}

  async getRescheduledReview(req: Request, res: Response): Promise<void> {
    const { reviewId } = req.params;
    const rescheduledReview = await this._getRescheduledReviewUsecase.execute(
      reviewId
    );
    res.status(HTTP_STATUS.OK).json(rescheduledReview);
  }
}
