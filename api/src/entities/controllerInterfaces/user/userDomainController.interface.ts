import { NextFunction, Request, Response } from "express";


export interface IUserDomainController{
    getAllDomains(req:Request,res:Response,next:NextFunction):Promise<void>
    getSpecificDomain(req:Request,res:Response,next:NextFunction):Promise<void>
    enrollDomain(req:Request,res:Response,next:NextFunction):Promise<void>
    getDomainDashboard(req:Request,res:Response,next:NextFunction):Promise<void>
    getDomainInsight(req:Request,res:Response,next:NextFunction):Promise<void>
}