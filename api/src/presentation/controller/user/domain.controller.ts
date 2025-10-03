import { IUserDomainController } from "application/interfaces/controller/user/userDomainController.interface";
import { IEnrollDomainUsecase } from "application/usecase/interfaces/domain/enrollDomainUsecase.interface";
import { IGetEnrolledDomainsUsecase } from "application/usecase/interfaces/domain/getDomainDashboardUsecase.interface";
import { IGetDomainInsightUsecase } from "application/usecase/interfaces/domain/getDomainInsightUsecase.interface";
import { IGetSpecificDomainUsecase } from "application/usecase/interfaces/domain/getSpecificDomainUsecase.interface";
import { IGetUnblockedDomainsUsecase } from "application/usecase/interfaces/domain/getUnblockedDomainsUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class UserDomainController implements IUserDomainController {
  constructor(
    @inject("IGetUnblockedDomainsUsecase")
    private _getUnblockedDomainsUsecase: IGetUnblockedDomainsUsecase,

    @inject("IGetSpecificDomainUsecase")
    private _getSpecificDomainUsecase: IGetSpecificDomainUsecase,

    @inject("IEnrollDomainUsecase")
    private _enrollDomainUsecase: IEnrollDomainUsecase,

    @inject("IGetEnrolledDomainsUsecase")
    private _getEnrolledDomainsUsecase: IGetEnrolledDomainsUsecase,

    @inject("IGetDomainInsightUsecase")
    private _getDomainInsightUsecase: IGetDomainInsightUsecase
  ) {}

  async getAllDomains(req: Request, res: Response): Promise<void> {
    const { currentPage, limit, sortBy, searchTerm } = req.verifiedData;
    console.log(req.verifiedData);
    const data = await this._getUnblockedDomainsUsecase.execute(
      currentPage,
      limit,
      sortBy!,
      searchTerm!
    );
    res.status(HTTP_STATUS.OK).json(data);
  }

  async getSpecificDomain(req: Request, res: Response): Promise<void> {
    console.log(req.verifiedData);
    const { domainId } = req.verifiedData;
    const unBlockedLevels = true;
    const domain = await this._getSpecificDomainUsecase.execute(
      domainId,
      unBlockedLevels
    );
    res.status(HTTP_STATUS.OK).json(domain);
  }

  async enrollDomain(req: Request, res: Response): Promise<void> {
    const { domainId, fullCourse, selectedLevelsId } = req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;
    await this._enrollDomainUsecase.execute(
      userId,
      domainId,
      fullCourse,
      selectedLevelsId
    );
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGE.DOMAINS.ENROLL });
  }

  async getDomainDashboard(req: Request, res: Response): Promise<void> {
    const { currentPage, limit } = req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;

    const data = await this._getEnrolledDomainsUsecase.execute(
      userId,
      currentPage,
      limit
    );
    res.status(HTTP_STATUS.OK).json(data);
  }

  async getDomainInsight(req: Request, res: Response): Promise<void> {
    const { domainId } = req.verifiedData;
    const studentId = (req as ModifiedRequest).user.id;

    const domainInsight = await this._getDomainInsightUsecase.execute(
      studentId,
      domainId
    );
    res.status(200).json(domainInsight);
  }
}
