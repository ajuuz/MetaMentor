import { Response } from "express";
import { config } from "shared/config";


export const setCookie=(res:Response,accessTokenCookieName:string,accessToken:string,refreshTokenCookieName:string,refreshToken:string)=>{
    const isProduction = config.node_env === "production";
            res.cookie(accessTokenCookieName,accessToken,{
                httpOnly: true,
                secure: isProduction,
                sameSite: "none",
            })

            res.cookie(refreshTokenCookieName,refreshToken,{
            httpOnly: true,
            secure: isProduction,
            sameSite: "none",
        })
}


