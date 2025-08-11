import { NextFunction, Request, Response } from "express";



export interface IFcmTokenController{
    saveFcmToken(req:Request,res:Response,next:NextFunction):Promise<void>
}