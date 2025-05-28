import { inject, injectable } from "tsyringe";
import { IAuthUsecase } from "entities/usecaseInterfaces/auth/send-otp-usecase.interface";
import { IOtpRespository } from "entities/repositoryInterfaces/auth/otp-repository.interface";
import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { ISignupDto } from "shared/dto/authDto/signupDto";
import { IUserRespository } from "entities/repositoryInterfaces/user/user-repository.interface";
import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IResponseSpecifier, responSpecifier } from "shared/responseSpecifiers";


@injectable()
export class AuthUsecase implements IAuthUsecase{

    constructor(
        @inject("IUserRepository")
        private _userRepository: IUserRespository,

        @inject("IOtpRepository")
        private _otpRepository: IOtpRespository,

        @inject("IEmailService")
        private _emailService: IEmailService
    ){}

    async register(formData:ISignupDto):Promise<IResponseSpecifier>{
        const userExists: IUserEntity|null = await this._userRepository.findByEmail(formData.email);
        if(userExists && userExists.isVerified){
            throw new Error("User already exists");
        }

        const otpExists = await this._otpRepository.getOtp(formData.email);
        if(otpExists){
            await this._otpRepository.deleteOtp(formData.email);
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const asyncOperations=[]

        asyncOperations.push(this._otpRepository.saveOtp(formData.email, otp))
        asyncOperations.push(this._emailService.sendMail(formData.email,"subject , otp",otp))

        if(!userExists){
            asyncOperations.push(this._userRepository.createUser(formData))
        }
        await Promise.all(asyncOperations)
        
        return userExists
        ?responSpecifier(true,202,`Account has been created . please verify your mail id`)
        :responSpecifier(true,201,`OTP sent successfully to  ${formData.email}`)
    }


    async verifyOtp(email:string,otp:string):Promise<void>{

        const userOtp = await this._otpRepository.getOtp(email);
        console.log(userOtp);
        
    }
}