import { IAdminReviewController } from "application/interfaces/controller/admin/reviewController.interface";
import { IGetReviewGrowthUsecase } from "application/usecase/interfaces/review/getReviewGrowthUsecase.interface";
import { IReviewCountUsecase } from "application/usecase/interfaces/review/reviewCountUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, ROLES } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminReviewController implements IAdminReviewController {
  constructor(
    @inject("IReviewCountUsecase")
    private _reviewCountUsecase: IReviewCountUsecase,

    @inject("IGetReviewGrowthUsecase")
    private _getReviewGrowthUsecase: IGetReviewGrowthUsecase
  ) {}

  async getReviewCounts(req: Request, res: Response): Promise<void> {
    const counts = await this._reviewCountUsecase.execute(ROLES.ADMIN);
    res.status(HTTP_STATUS.OK).json(counts); 
  }

  async getReviewGrowth(req: Request, res: Response): Promise<void> {
    const { timePeriod, timePeriodGroupBy } = req.verifiedData;
    const data = await this._getReviewGrowthUsecase.execute(
      timePeriod,
      timePeriodGroupBy
    );
    res.status(HTTP_STATUS.OK).json(data);
  }
}
