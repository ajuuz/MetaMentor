import {Request, Response } from "express";



export interface IAdminDomainController{
    addDomain(req:Request,res:Response):Promise<void>
    getAllDomains(req:Request,res:Response):Promise<void>
    updateDomainStatus(req:Request,res:Response):Promise<void>
}