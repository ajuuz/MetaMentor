import { IAuthController } from "entities/controllerInterfaces/user/auth-controller.interface";
import { IAuthUsecase } from "entities/usecaseInterfaces/auth/send-otp-usecase.interface";
import { NextFunction, Request, Response } from "express";
import { IloginDTO, ISignupRequestDto } from "shared/dto/authDto";
import { setCookie } from "shared/utils/cookie/cookeHelper";
import { ISuccessResponseHandler } from "shared/utils/successResponseHandler";
import { inject, injectable } from "tsyringe";


@injectable()
export class AuthController implements IAuthController{

    constructor(
        @inject("IAuthUsecase")
        private _AuthUsecase:IAuthUsecase
    ){}
    
    async signup(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const formData:ISignupRequestDto= req.body;
            const response:ISuccessResponseHandler=await this._AuthUsecase.register(formData);
            res.status(response.statusCode).json(response.content);
        } catch (error) {
            next(error)
        }
    }

    async verifyOtp(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {email,otp} = req.body;
            await this._AuthUsecase.verifyOtp(email,otp)
            res.status(201).json({success:true,message:"user verified Successfully"})
        }
        catch(error){
            console.log("here")
            next(error)
        }
    }

    async login(req:Request,res:Response,next:NextFunction):Promise<void>{

        const {email,password}:{email:string,password:string} = req.body;
        try{

            const details:IloginDTO = await this._AuthUsecase.login(email,password);
            const {accessToken,refreshToken,...rest} = details
            const accessTokenCookieName=`${details.role}accessToken`;
            const refreshTokenCookieName=`${details.role}refreshToken`;
            
            setCookie(res,accessTokenCookieName,accessToken,refreshTokenCookieName,refreshToken);
            res.status(200).json({success:true,message:"user logged in successfully",userDetails:rest})
        }catch(error){
            next(error)
        }
    }
}