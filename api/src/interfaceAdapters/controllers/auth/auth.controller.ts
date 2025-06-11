import { IAuthController } from "entities/controllerInterfaces/user/auth-controller.interface";
import { ILoginUsecase } from "entities/usecaseInterfaces/auth/loginUsecase.interface";
import { IRegisterUserUsecase } from "entities/usecaseInterfaces/auth/registerUsecase.interface";
import { IVerifyOtpUsecase } from "entities/usecaseInterfaces/auth/verifyOtpUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { loginResponseDTO, SignupRequestDto } from "shared/dto/authDTO";
import { setCookie } from "shared/utils/cookie/cookeHelper";
import { ISuccessResponseHandler } from "shared/utils/successResponseHandler";
import { inject, injectable } from "tsyringe";


@injectable()
export class AuthController implements IAuthController{

    constructor(
        @inject("IRegisterUserUsecase")
        private _RegisterUserUsecase:IRegisterUserUsecase,

        @inject("IVerifyOtpUsecase")
        private _VerifyOtpUsecase:IVerifyOtpUsecase,

        @inject("ILoginUsecase")
        private _LoginUsecase:ILoginUsecase
    ){}
    
    async signup(req: Request, res: Response,next:NextFunction): Promise<void> {
        try {
            const formData:SignupRequestDto= req.body;
            const response:ISuccessResponseHandler=await this._RegisterUserUsecase.execute(formData);
            res.status(response.statusCode).json(response.content);
        } catch (error) {
            next(error)
        }
    }

    async verifyOtp(req:Request,res:Response,next:NextFunction):Promise<void>{
        try{
            const {email,otp} = req.body;
            await this._VerifyOtpUsecase.execute(email,otp)
            res.status(201).json({success:true,message:"user verified Successfully"})
        }
        catch(error){
            next(error)
        }
    }

    async login(req:Request,res:Response,next:NextFunction):Promise<void>{

        const {email,password}:{email:string,password:string} = req.body;
        try{

            const details:loginResponseDTO = await this._LoginUsecase.execute(email,password);
            const {accessToken,refreshToken,...rest} = details
            
            setCookie(res,accessToken,refreshToken);
            res.status(200).json({success:true,message:"user logged in successfully",data:rest})
        }catch(error){
            next(error)
        }
    }
}