import { Request } from 'express';
import jwt from 'jsonwebtoken'
import { config } from 'shared/config';

export const refreshTokenDecoder = (req:Request)=>{
    if(!req?.cookies?.userRefreshToken) return null
    const token = req.cookies.userRefreshToken;
    const decode= jwt.verify(token,config.refreshTokenSecretKey) as jwt.JwtPayload
    const id = decode.id;
    return id;
}