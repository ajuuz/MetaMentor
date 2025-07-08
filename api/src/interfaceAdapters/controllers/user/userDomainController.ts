import { IUserDomainController } from "entities/controllerInterfaces/user/userDomainController.interface";
import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { IEnrollDomainUsecase } from "entities/usecaseInterfaces/domain/enrollDomainUsecase.interface";
import { IGetEnrolledDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainDashboardUsecase.interface";
import { IGetSpecificDomainUsecase } from "entities/usecaseInterfaces/domain/getSpecificDomainUsecase.interface";
import { IGetUnblockedDomainsUsecase } from "entities/usecaseInterfaces/domain/getUnblockedDomainsUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserDomainController implements IUserDomainController{

    constructor(
        @inject('IGetUnblockedDomainsUsecase')
        private _getUnblockedDomainsUsecase:IGetUnblockedDomainsUsecase,

        @inject('IGetSpecificDomainUsecase')
        private _getSpecificDomainUsecase:IGetSpecificDomainUsecase,

        @inject('IEnrollDomainUsecase')
        private _enrollDomainUsecase:IEnrollDomainUsecase,

        @inject('IGetEnrolledDomainsUsecase')
        private _getEnrolledDomainsUsecase:IGetEnrolledDomainsUsecase,

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

    async enrollDomain(req:Request,res:Response,next:NextFunction):Promise<void>{
        const userId = (req as ModifiedRequest).user.id;
        const domainId:string = req.params.domainId;
        await this._enrollDomainUsecase.execute(userId,domainId)
        res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGE.DOMAINS.ENROLL})
    }

    async getDomainDashboard(req:Request,res:Response,next:NextFunction):Promise<void>{
        console.log("comes here")
        const userId = (req as ModifiedRequest).user.id;
        const domains:IDomainEntity[]=await this._getEnrolledDomainsUsecase.execute(userId)
        res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGE.DOMAINS.FETCH_ALL,data:domains})
    }
}