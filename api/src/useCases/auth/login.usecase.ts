import { IFcmTokenRepository } from "entities/repositoryInterfaces/fcmTokenRepository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { ILoginUsecase } from "entities/usecaseInterfaces/auth/loginUsecase.interface";
import { ROLES } from "shared/constants";
import { loginResponseDTO } from "shared/dto/authDTO";
import { comparePassword } from "shared/utils/bcryptHelper";
import { CustomError } from "shared/utils/error/customError";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class LoginUsecase implements ILoginUsecase{

    constructor(
        @inject("IUserRepository")
        private _userRepository: IUserRespository,

        @inject('ITokenService')
        private _tokenService:ITokenService,

        @inject('IFcmTokenRepository')
        private _fcmTokenRepository:IFcmTokenRepository
    ){}

     async execute(email:string,password:string,fcmToken:string|null):Promise<loginResponseDTO>{
            
            if(!email || !password){
                throw new ValidationError("insufficient data");
            }
    
            const user = await this._userRepository.findByEmail(email);
            if(!user){
                throw new NotFoundError("Signup first to login");
            }
            
            const userPassword = user.password;
            if(!userPassword) throw new CustomError(400,"try google login");
            
            const isMatch =await comparePassword(password,userPassword)
            if(!isMatch){
                throw new NotFoundError("Invalid Credential");
            }

            if(user.role!==ROLES.ADMIN){
                if(!user.isVerified){
                    throw new CustomError(401,"Verify otp to create account")
                }

                 if(user.isBlocked){
                throw new CustomError(403,"Admin has been blocked you. please contact admin")
                }
            }
    
            const accessToken = this._tokenService.generateAccessToken({id:user._id,email:user.email,role:user.role});
            const refreshToken = this._tokenService.generateRefreshToken({id:user._id,email:user.email,role:user.role});
    
            const userDetails:loginResponseDTO={
                name:user.name,
                email:user.email,
                role:user.role,
                accessToken,
                refreshToken
            }

            if(fcmToken){
                await this._fcmTokenRepository.insertOne({userId:user._id,fcmToken})
            }

            return userDetails;
        }
}