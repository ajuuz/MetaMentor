import { IAuthController } from "entities/controllerInterfaces/user/auth-controller.interface";
import { IAuthUsecase } from "entities/usecaseInterfaces/auth/send-otp-usecase.interface";
import { Request, Response } from "express";
import { ISignupDto } from "shared/dto/authDto/signupDto";
import { IResponseSpecifier } from "shared/responseSpecifiers";
import { inject, injectable } from "tsyringe";


@injectable()
export class AuthController implements IAuthController{

    constructor(
        @inject("IAuthUsecase")
        private _AuthUsecase:IAuthUsecase
    ){}
    
    async signup(req: Request, res: Response): Promise<void> {
        try {
            const formData:ISignupDto= req.body;
            const response:IResponseSpecifier = await this._AuthUsecase.register(formData);
            res.status(response.statusCode).json(response.content);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server Error from controller" });
        }
    }

    async verifyOtp(req:Request,res:Response):Promise<void>{
        try{
            const {email,otp} = req.body;
            await this._AuthUsecase.verifyOtp(email,otp)

        }
        catch(error){
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}