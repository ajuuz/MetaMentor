import { IUserDomainController } from "entities/controllerInterfaces/user/userDomainController.interface";
import { IGetSpecificDomainUsecase } from "entities/usecaseInterfaces/domain/getSpecificDomainUsecase.interface";
import { IGetUnblockedDomainsUsecase } from "entities/usecaseInterfaces/domain/getUnblockedDomainsUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserDomainController implements IUserDomainController{

    constructor(
        @inject('IGetUnblockedDomainsUsecase')
        private _getUnblockedDomainsUsecase:IGetUnblockedDomainsUsecase,

        @inject('IGetSpecificDomainUsecase')
        private _getSpecificDomainUsecase:IGetSpecificDomainUsecase
    ){}

     async getAllDomains(req:Request,res:Response,next:NextFunction):Promise<void>{
      const currentPage = typeof req.query.currentPage==='string'?parseInt(req.query.currentPage):1;
      const limit = typeof req.query.limit==='string'?parseInt(req.query.limit):10;
      
      const data:Omit<GetAllDomainsResponseDTO,'totalDocuments'> = await this._getUnblockedDomainsUsecase.execute(currentPage,limit)
      res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGE.DOMAINS.FETCH_ALL,data})
    }

    async getSpecificDomain(req:Request,res:Response,next:NextFunction):Promise<void>{
        const domainId:string = req.params.domainId;

        const domain = await this._getSpecificDomainUsecase.execute(domainId);
        res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGE.DOMAINS.FETCH_ALL,data:domain})
    }
}