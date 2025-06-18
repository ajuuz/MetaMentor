import { IOtpRespository } from "entities/repositoryInterfaces/otp-repository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { IForgotPasswordSendMailUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordMailUsecase.interface";
import { config } from "shared/config";
import { EVENT_EMITTER_TYPE, MAIL_CONTENT_PURPOSE } from "shared/constants";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/mailContentProvider";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";



@injectable()
export class ForgotPasswordSendMailUsecase implements IForgotPasswordSendMailUsecase{

    constructor(
        @inject('IUserRepository')
        private _userRepository:IUserRespository,

        @inject("ITokenService")
        private _tokenService:ITokenService,

        @inject('IEmailService')
        private _emailService:IEmailService
    ){}

   async execute(email:string):Promise<void>{
        if(!email) throw new ValidationError("Email is required")

        const user = await this._userRepository.findByEmail(email)

        if(!user || !user.isVerified) throw new NotFoundError("User not found");

        const token = this._tokenService.generateForgotPasswordToken(email)
         const html=mailContentProvider(MAIL_CONTENT_PURPOSE.FORGOT_PASSWORD,token)
        
        await this._emailService.sendMail(email,"Password Reset Request",html)
   }
}