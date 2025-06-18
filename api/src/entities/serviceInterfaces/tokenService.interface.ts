import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import { ROLES } from "shared/constants";



export interface ITokenService{
    generateForgotPasswordToken(email:string):string
    verifyForgotPasswordToken(token:string):JwtPayload
    generateAccessToken(payload:{id:ObjectId,email:string,role:ROLES}):string;
    generateRefreshToken(payload:{id:ObjectId,email:string,role:ROLES}):string;
    verifyAccessToken(token:string):JwtPayload
    verifyRefreshToken(token:string):JwtPayload
}