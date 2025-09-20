
import { NextFunction, Request,Response } from 'express';

export interface IAuthController {
    signup: (req: Request, res: Response,next:NextFunction) => Promise<void>;
    verifyOtp:(req:Request,res:Response,next:NextFunction)=>Promise<void>
    login:(req:Request,res:Response,next:NextFunction)=>Promise<void>
    googleAuth(req:Request,res:Response,next:NextFunction):Promise<void>
    resendOtp(req:Request,res:Response,next:NextFunction):Promise<void>
    forgotPasswordSendMail(req:Request,res:Response,next:NextFunction):Promise<void>
    forgotPasswordReset(req:Request,res:Response,next:NextFunction):Promise<void>
    tokenRefreshing(req:Request,res:Response,next:NextFunction):Promise<void>
    logout(req:Request,res:Response,next:NextFunction):Promise<void>
}

