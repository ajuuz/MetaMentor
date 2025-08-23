import { IUserDomainController } from "entities/controllerInterfaces/user/userDomainController.interface";
import { IEnrollDomainUsecase } from "entities/usecaseInterfaces/domain/enrollDomainUsecase.interface";
import { IGetEnrolledDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainDashboardUsecase.interface";
import { IGetDomainInsightUsecase } from "entities/usecaseInterfaces/domain/getDomainInsightUsecase.interface";
import { IGetSpecificDomainUsecase } from "entities/usecaseInterfaces/domain/getSpecificDomainUsecase.interface";
import { IGetUnblockedDomainsUsecase } from "entities/usecaseInterfaces/domain/getUnblockedDomainsUsecase.interface";
import {  Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { ModifiedRequest } from "type/types";
import { inject, injectable } from "tsyringe";
import {
  EnrollDomainReqDTO,
  GetAllDomainsForStudReqDTO,
  GetDomainDashboardForStudReqDTO,
  GetDomainInsightReqDTO,
  GetSpecificDomainForStudReqDTO,
} from "shared/dto/request/domain.dto";

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

  async getAllDomains(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { currentPage, limit }: GetAllDomainsForStudReqDTO = req.verifiedData;
    const data: Omit<GetAllDomainsResponseDTO, "totalDocuments"> =
      await this._getUnblockedDomainsUsecase.execute(currentPage, limit);
    res.status(HTTP_STATUS.OK).json(data);
  }

  async getSpecificDomain(
    req: Request,
    res: Response,
  ): Promise<void> {
    console.log(req.verifiedData);
    const { domainId }: GetSpecificDomainForStudReqDTO = req.verifiedData;
    const domain = await this._getSpecificDomainUsecase.execute(domainId);
    res.status(HTTP_STATUS.OK).json(domain);
  }

  async enrollDomain(
    req: Request,
    res: Response,
  ): Promise<void> {
    console.log(req.verifiedData);
    const { domainId }: EnrollDomainReqDTO = req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;
    await this._enrollDomainUsecase.execute(userId, domainId);
    res
      .status(HTTP_STATUS.OK)
      .json({ success: true, message: SUCCESS_MESSAGE.DOMAINS.ENROLL });
  }

  async getDomainDashboard(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { currentPage, limit }: GetDomainDashboardForStudReqDTO =
      req.verifiedData;
    const userId = (req as ModifiedRequest).user.id;

    const data: Omit<GetAllDomainsResponseDTO, "totalDocuments"> =
      await this._getEnrolledDomainsUsecase.execute(userId, currentPage, limit);
    res.status(HTTP_STATUS.OK).json(data);
  }

  async getDomainInsight(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { domainId }: GetDomainInsightReqDTO = req.verifiedData;
    const studentId = (req as ModifiedRequest).user.id;

    const domainInsight = await this._getDomainInsightUsecase.execute(
      studentId,
      domainId
    );
    res.status(200).json(domainInsight);
  }
}
