import { NextFunction, Request, Response } from "express";



export interface IAdminDomainController{
    addDomain(req:Request,res:Response,next:NextFunction):Promise<void>
    getAllDomains(req:Request,res:Response,next:NextFunction):Promise<void>
    updateDomainStatus(req:Request,res:Response,next:NextFunction):Promise<void>
}