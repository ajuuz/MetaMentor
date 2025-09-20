import { NextFunction, Request, Response } from "express";



export interface IUserController{

    getDetails(req:Request,res:Response,next:NextFunction):Promise<void>
    updateUser(req:Request,res:Response,next:NextFunction):Promise<void>
}