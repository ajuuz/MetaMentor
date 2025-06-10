import { NextFunction, Request, Response } from "express";

export interface IAdminMentorController{
    getAllMentors(req:Request,res:Response,next:NextFunction):Promise<void>
    getSpecificMentor(req:Request,res:Response,next:NextFunction):Promise<void>
    mentorApplicationVerification(req:Request,res:Response,next:NextFunction):Promise<void>
    updateMentorStatus(req:Request,res:Response,next:NextFunction):Promise<void>
}