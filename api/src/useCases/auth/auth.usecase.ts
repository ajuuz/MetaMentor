import { inject, injectable } from "tsyringe";
import { IAuthUsecase } from "entities/usecaseInterfaces/auth/send-otp-usecase.interface";
import { IOtpRespository } from "entities/repositoryInterfaces/auth/otp-repository.interface";
import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { IloginDTO, ISignupRequestDto } from "shared/dto/authDto";
import { IUserRespository } from "entities/repositoryInterfaces/user/user-repository.interface";
import { IUserEntity } from "entities/modelEntities/user-model.entity";
import {  ISuccessResponseHandler, successResponseHandler } from "shared/utils/successResponseHandler";
import { CustomError } from "shared/utils/error/customError";
import { HTTP_STATUS } from "shared/constants";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { IStudentRepository } from "entities/repositoryInterfaces/student/student-repository.interface";
import { IUserModel } from "frameworks/database/models/user.model";
import { AccessTokenService } from "interfaceAdapters/services/token.service";


@injectable()
export class AuthUsecase implements IAuthUsecase{

    constructor(
        @inject("IUserRepository")
        private _userRepository: IUserRespository,

        @inject("IOtpRepository")
        private _otpRepository: IOtpRespository,

        @inject("IEmailService")
        private _emailService: IEmailService,

        @inject("IStudentRepository")
        private _studentRepository:IStudentRepository
    ){}

    async register(formData:ISignupRequestDto):Promise<ISuccessResponseHandler>{
        const userExists: IUserEntity|null = await this._userRepository.findByEmail(formData.email);
        if(userExists && userExists.isVerified){
            throw new CustomError(HTTP_STATUS.CONFLICT,"User already exists")
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
        ?successResponseHandler(true,202,`Account has been created already. please verify your mail id`)
        :successResponseHandler(true,201,`OTP sent successfully to  ${formData.email}`)
    }


    async verifyOtp(email:string,otp:string):Promise<void>{

        if(!email || !otp){
            throw new ValidationError("insuffient data");
        }

        const userOtp = await this._otpRepository.getOtp(email);
        if(!userOtp){
            throw new NotFoundError("Otp has been expired");
        }

        if(otp!==userOtp){
            throw new CustomError(401,"invalid otp")
        }

        const user = await this._userRepository.findByEmail(email) as IUserModel
        
        const asyncOperations:Promise<void>[]=[];
        asyncOperations.push(this._userRepository.updateVerification(email));
        asyncOperations.push(this._studentRepository.createStudent(user._id));

        await Promise.all(asyncOperations)
    }


    async login(email:string,password:string):Promise<IloginDTO>{
        
        if(!email || !password){
            throw new ValidationError("insufficient data");
        }

        const user = await this._userRepository.findByEmailAndPassword(email,password);
        if(!user){
            throw new NotFoundError("Signup first to login");
        }

        if(!user.isVerified){
            throw new CustomError(401,"Verify otp to create account")
        }

        if(user.isBlocked){
            throw new CustomError(403,"Admin has been blocked you. please contact admin")
        }

        const accessToken = AccessTokenService.generateAccessToken({_id:user._id,email:user.email,role:user.role});
        const refreshToken = AccessTokenService.generateRefreshToken({_id:user._id,email:user.email,role:user.role});

        const userDetails:IloginDTO={
            name:user.name,
            email:user.email,
            role:user.role,
            accessToken,
            refreshToken
        }
        return userDetails;
    }
}