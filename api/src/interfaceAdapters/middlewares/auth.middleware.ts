import { IAuthMiddleware } from "entities/middlewareInterfaces/authMiddleware.interface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGE, HTTP_STATUS, ROLES } from "shared/constants";
import { AuthError } from "shared/utils/error/authError";
import { inject, injectable } from "tsyringe";


interface ModifiedRequest extends Request{
    user:{
        id:string
        role:ROLES
    }
}

@injectable()
export class AuthMiddleware implements IAuthMiddleware{

    constructor(
        @inject('ITokenService')
        private _tokenService:ITokenService
    ){}

    verifyAuth(req:Request,res:Response,next:NextFunction):void{
            const accessToken = req.cookies.accessToken;
            try{
                if(!accessToken){
                    throw new AuthError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.UNAUTHORIZED_ACCESS_NOT_LOGIN)
                }
                
                const user:JwtPayload=this._tokenService.verifyAccessToken(accessToken);
                (req as ModifiedRequest).user={
                    id:user._id,
                    role:user.role
                }
                next()
            }
            catch(error){
                next(error)
            }
    }

    verifyAuthRole(authorizedRole:ROLES[]):(req: Request, res: Response, next: NextFunction) => void{
        return (req:Request,res:Response,next:NextFunction):void=>{
            const {role} = (req as ModifiedRequest).user;
            if(!authorizedRole.includes(role)){
                throw new AuthError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.UNAUTHORIZED_ACCESS)
            }
            next()
        }
    }
}