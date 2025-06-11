import { Request } from 'express';
import jwt from 'jsonwebtoken'
import { config } from 'shared/config';

export const refreshTokenDecoder = (req:Request)=>{
    if(!req?.cookies?.refreshToken) return null
    const token = req.cookies.refreshToken;
    const decode= jwt.verify(token,config.jwt.REFRESH_SECRET_KEY) as jwt.JwtPayload
    const id = decode.id;
    return id;
}