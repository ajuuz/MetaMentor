import { ICommonDomainController } from "entities/controllerInterfaces/common/domainController.interface";
import { IGetAllDomainsNameAndIdUsecase } from "application/usecase/interfaces/domain/getDomainsNameAndIdUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class CommonDomainController implements ICommonDomainController {
  constructor(
    @inject("IGetAllDomainsNameAndIdUsecase")
    private _getAllDomainsNameAndIdUsecase: IGetAllDomainsNameAndIdUsecase
  ) {}
  async getDomainNamesAndId(req: Request, res: Response): Promise<void> {
    const data = await this._getAllDomainsNameAndIdUsecase.execute();
    res.status(HTTP_STATUS.OK).json(data);
  }
}
