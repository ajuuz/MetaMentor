import { NextFunction, Request, Response } from "express";



export interface IAdminCommunityController{

    getCommunities(req:Request,res:Response,next:NextFunction):Promise<void>
    updateCommunityStatus(req:Request,res:Response,next:NextFunction):Promise<void>
}