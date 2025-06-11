import { Response } from "express";
import { config } from "shared/config";


export const setCookie=(res:Response,accessToken:string,refreshToken:string)=>{
    const isProduction = config.node_env === "production";
            res.cookie('accessToken',accessToken,{
                httpOnly: true,
                secure: isProduction,
            })

            res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            secure: isProduction,
        })
}


