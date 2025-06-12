import { ObjectId } from "mongoose";
import { ERROR_MESSAGE, HTTP_STATUS, ROLES } from "shared/constants";
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import { config } from "shared/config";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { injectable } from "tsyringe";
import ms from 'ms'
import { CustomError } from "shared/utils/error/customError";


@injectable()
export class TokenService implements ITokenService{

    private _accessSecretKey:Secret
    private _accessExpiresIn:string
    private _refreshSecretKey:Secret
    private _refreshExpiresIn:string

    constructor(){
        this._accessSecretKey=config.jwt.ACCESS_SECRET_KEY
        this._accessExpiresIn=config.jwt.ACCESS_EXPIRES_IN
        this._refreshSecretKey=config.jwt.REFRESH_SECRET_KEY
        this._refreshExpiresIn=config.jwt.REFRESH_EXPIRES_IN
    }

     generateAccessToken(payload:{id:ObjectId,email:string,role:ROLES}):string{
        const token = jwt.sign(payload,this._accessSecretKey,{
            expiresIn:this._accessExpiresIn as ms.StringValue
        })
        return token;
    }

     generateRefreshToken(payload:{id:ObjectId,email:string,role:ROLES}):string{
            const token = jwt.sign(payload,this._refreshSecretKey,{
                expiresIn:this._refreshExpiresIn as ms.StringValue
            })
            return token;
        }

    verifyAccessToken(token:string):JwtPayload{
        try{
            const decode = jwt.verify(token,this._accessSecretKey);
            return decode as JwtPayload
        }
        catch(error:unknown){
             if(error instanceof Error){
                    if(error.name==="TokenExpiredError"){
                        throw new CustomError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.TOKEN_EXPIRED_ACCESS)
                    }else if(error.name==="JsonWebTokenError"){
                        throw new CustomError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.INVALID_TOKEN)
                    }
                }
            throw new CustomError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.UNAUTHORIZED_ACCESS)
        }
    }

    verifyRefreshToken(token:string):JwtPayload{
        try{
            const decode = jwt.verify(token,this._refreshSecretKey);
            return decode as JwtPayload
        }catch(error){
            if(error instanceof Error){
                    if(error.name==="TokenExpiredError"){
                        throw new CustomError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.TOKEN_EXPIRED_REFRESH)
                    }else if(error.name==="JsonWebTokenError"){
                        throw new CustomError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.INVALID_TOKEN)
                    }
                }
            throw new CustomError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.UNAUTHORIZED_ACCESS)
        }
    }

}