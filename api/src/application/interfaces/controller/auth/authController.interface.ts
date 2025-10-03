
import { NextFunction, Request,Response } from 'express';

export interface IAuthController {
    signup: (req: Request, res: Response,next:NextFunction) => Promise<void>;
    verifyOtp:(req:Request,res:Response,next:NextFunction)=>Promise<void>
    login:(req:Request,res:Response)=>Promise<void>
    googleAuth(req:Request,res:Response,next:NextFunction):Promise<void>
    resendOtp(req:Request,res:Response):Promise<void>
    forgotPasswordSendMail(req:Request,res:Response):Promise<void>
    forgotPasswordReset(req:Request,res:Response):Promise<void>
    tokenRefreshing(req:Request,res:Response):Promise<void>
    logout(req:Request,res:Response):Promise<void>
}

