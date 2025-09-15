import { NextFunction, Request, Response } from "express";
import { ROLES } from "shared/constants";



export interface IAuthMiddleware{
    verifyAuth(req:Request,res:Response,next:NextFunction):void
    verifyAuthRole(authorizedRole:ROLES[]):(req: Request, res: Response, next: NextFunction) => void
    blockChecker(req:Request,res:Response,next:NextFunction):Promise<void>
}