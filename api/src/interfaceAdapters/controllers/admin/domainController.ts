import { IAdminDomainController } from "entities/controllerInterfaces/admin/adminDomainController.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { NextFunction, Request, Response } from "express";
import {  HTTP_STATUS, ROLES, SUCCESS_MESSAGE } from "shared/constants";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";


@injectable()
export class AdminDomainController implements IAdminDomainController{

    constructor(
        @inject('IAddDomainUsecase')
        private _addDomainUsecase:IAddDomainUsecase,

        @inject('IGetAllDomainsUsecase')
        private _getAllDomainsUsecase:IGetAllDomainsUsecase
    ){}

    async addDomain(req:Request,res:Response,next:NextFunction):Promise<void>{
        const domainDetails=req.body
        await this._addDomainUsecase.execute(domainDetails)
        res.status(HTTP_STATUS.CREATED).json({success:true,message:SUCCESS_MESSAGE.DOMAINS.CREATED})
    }

    async getAllDomains(req:Request,res:Response,next:NextFunction):Promise<void>{
        const role :ROLES = (req as ModifiedRequest).user.role;
        const currentPage =typeof req.query.currentPage==='string'?parseInt(req.query.currentPage):1;
        const limit =typeof req.query.limit==='string'?parseInt(req.query.limit):10;
        console.log(role,currentPage,limit)
        const data:Omit<GetAllDomainsResponseDTO,'totalDocuments'> = await this._getAllDomainsUsecase.execute(role,currentPage,limit)
        res.status(HTTP_STATUS.OK).json({success:true,message:SUCCESS_MESSAGE.DOMAINS.FETCH_ALL,data})
    }
}