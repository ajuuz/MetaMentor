import { IAdminDomainController } from "entities/controllerInterfaces/admin/adminDomainController.interface";
import { NextFunction, Request, Response } from "express";



export class AdminDomainController implements IAdminDomainController{

    constructor(){}

    async addDomain(req:Request,res:Response,next:NextFunction):Promise<void>{
        const {domainDetails}=req.body

    }
}