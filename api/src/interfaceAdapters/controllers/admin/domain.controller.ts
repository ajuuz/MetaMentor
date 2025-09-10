import { IAdminDomainController } from "entities/controllerInterfaces/admin/adminDomainController.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { IEditDomainUsecase } from "entities/usecaseInterfaces/domain/editDomainUsecase";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { IGetSpecificDomainUsecase } from "entities/usecaseInterfaces/domain/getSpecificDomainUsecase.interface";
import { IUpdateDomainStatusUsecase } from "entities/usecaseInterfaces/domain/updateDomainStatusUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import {
  CreateDomainReqDTO,
  EditDomainReqDTO,
  GetAllDomainsForAdminReqDTO,
  GetDomainForAdminReqDTO,
  UpdateDomainStatusDTO,
} from "shared/dto/request/domain.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class AdminDomainController implements IAdminDomainController {
  constructor(
    @inject("IAddDomainUsecase")
    private _addDomainUsecase: IAddDomainUsecase,

    @inject("IEditDomainUsecase")
    private _editDomainUsecase: IEditDomainUsecase,

    @inject("IGetAllDomainsUsecase")
    private _getAllDomainsUsecase: IGetAllDomainsUsecase,

    @inject("IGetSpecificDomainUsecase")
    private _getSpecificDomainUsecase: IGetSpecificDomainUsecase,

    @inject("IUpdateDomainStatusUsecase")
    private _updateDomainStatusUsecase: IUpdateDomainStatusUsecase
  ) {}

  async addDomain(req: Request, res: Response): Promise<void> {
    const domainDetails: CreateDomainReqDTO = req.verifiedData;
    await this._addDomainUsecase.execute(domainDetails);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: SUCCESS_MESSAGE.DOMAINS.CREATED });
  }

  async editDomain(req: Request, res: Response): Promise<void> {
    const updationDetails: EditDomainReqDTO = req.verifiedData;
    await this._editDomainUsecase.execute(updationDetails);
    res
      .status(HTTP_STATUS.CREATED)
      .json({ success: true, message: SUCCESS_MESSAGE.DOMAINS.UPDATED });
  }

  async getAllDomains(req: Request, res: Response): Promise<void> {
    const {
      currentPage,
      limit,
      sortBy,
      searchTerm,
    }: GetAllDomainsForAdminReqDTO = req.verifiedData;

    const data = await this._getAllDomainsUsecase.execute(
      currentPage,
      limit,
      sortBy!,
      searchTerm!
    );
    res.status(HTTP_STATUS.OK).json(data);
  }

  async getDomain(req: Request, res: Response): Promise<void> {
    const { domainId }: GetDomainForAdminReqDTO = req.verifiedData;
    const data = await this._getSpecificDomainUsecase.execute(domainId);
    res.status(HTTP_STATUS.OK).json(data);
  }

  async updateDomainStatus(req: Request, res: Response): Promise<void> {
    const { domainId, status }: UpdateDomainStatusDTO = req.verifiedData;
    await this._updateDomainStatusUsecase.execute(domainId, status);
    res
      .status(200)
      .json({ success: true, message: SUCCESS_MESSAGE.DOMAINS.UPDATE_STATUS });
  }
}
