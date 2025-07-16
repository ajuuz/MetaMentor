import { NextFunction, Request, Response } from "express";


export interface IUserSlotController{

    getDomainSlots(req:Request,res:Response,next:NextFunction):Promise<void>
    slotValidityChecker(req:Request,res:Response,next:NextFunction):Promise<void>
}