import { NextFunction, Request, Response } from "express";


export interface IMentorController{
    registerForm(req:Request,res:Response,next:NextFunction):Promise<void>
    getDomains(req:Request,res:Response,next:NextFunction):Promise<void>
}