import { NextFunction, Request, Response } from "express";



export interface IMentorSlotController{
    updateSlot(req:Request,res:Response,next:NextFunction):Promise<void>
    getSlots(req:Request,res:Response,next:NextFunction):Promise<void>
}