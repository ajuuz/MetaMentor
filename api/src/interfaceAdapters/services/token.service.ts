import { ObjectId } from "mongoose";
import { ROLES } from "shared/constants";
import jwt from "jsonwebtoken"
import { config } from "shared/config";
import { Response } from "express";

export class AccessTokenService{

    static generateAccessToken(payload:{_id:ObjectId,email:string,role:ROLES}):string{
        const token = jwt.sign(payload,config.accessTokenSecretKey,{
            expiresIn:"15m"
        })
        return token;
    }

    static generateRefreshToken(payload:{_id:ObjectId,email:string,role:ROLES}):string{
            const token = jwt.sign(payload,config.refreshTokenSecretKey,{
                expiresIn:"7d"
            })
            return token;
        }

}