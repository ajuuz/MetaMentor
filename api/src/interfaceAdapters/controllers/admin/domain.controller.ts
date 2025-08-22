import { IAdminDomainController } from "entities/controllerInterfaces/admin/adminDomainController.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { IUpdateDomainStatusUsecase } from "entities/usecaseInterfaces/domain/updateDomainStatusUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { GetAllDomainForAdminReqDTO, UpdateDomainStatusDTO } from "shared/dto/request/domain.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminDomainController implements IAdminDomainController {
  constructor(
    @inject("IAddDomainUsecase")
    private _addDomainUsecase: IAddDomainUsecase,

    @inject("IGetAllDomainsUsecase")
    private _getAllDomainsUsecase: IGetAllDomainsUsecase,

    @inject("IUpdateDomainStatusUsecase")
    private _updateDomainStatusUsecase: IUpdateDomainStatusUsecase
  ) {}

  async addDomain(
    req: Request,
    res: Response,
  ): Promise<void> {
      const domainDetails = req.verifiedData;
      await this._addDomainUsecase.execute(domainDetails);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, message: SUCCESS_MESSAGE.DOMAINS.CREATED });
  }

  async getAllDomains(
    req: Request,
    res: Response,
  ): Promise<void> {
    const {currentPage,limit}:GetAllDomainForAdminReqDTO=req.verifiedData
    const data: Omit<GetAllDomainsResponseDTO, "totalDocuments"> =
      await this._getAllDomainsUsecase.execute(currentPage, limit);
    res.status(HTTP_STATUS.OK).json(data);
  }

  async updateDomainStatus(
    req: Request,
    res: Response,
  ): Promise<void> {
    const {domainId,status}:UpdateDomainStatusDTO=req.verifiedData
    await this._updateDomainStatusUsecase.execute(domainId, status);
    res
      .status(200)
      .json({ success: true, message: SUCCESS_MESSAGE.DOMAINS.UPDATE_STATUS });
  }
}
