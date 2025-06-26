import { IBlackListTokenRepository } from "entities/repositoryInterfaces/blackListTokenRepository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { IForgotPasswordResetUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordResetUsecase.interface";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGE, HTTP_STATUS } from "shared/constants";
import { hashPassword } from "shared/utils/bcryptHelper";
import { AuthError } from "shared/utils/error/authError";
import { CustomError } from "shared/utils/error/customError";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ForgotPasswordResetUsecase implements IForgotPasswordResetUsecase{

    constructor(
        @inject('ITokenService')
        private _tokenService:ITokenService,

        @inject('IUserRepository')
        private _userRepository:IUserRespository,

        @inject('IBlackListTokenRepository')
        private _blackListTokenRepository:IBlackListTokenRepository
    ){}
    async execute(password:string,token:string):Promise<void>{
        if(!password) throw new ValidationError("Password is required");
        if(!token) throw new AuthError(HTTP_STATUS.UNAUTHORIZED,ERROR_MESSAGE.UNAUTHORIZED_ACCESS)

        const payload:JwtPayload =this._tokenService.verifyForgotPasswordToken(token)
        const {email} = payload
        const fieldName=`forgotPassword:${email}`
        const blacklisteToken=await this._blackListTokenRepository.getToken(fieldName)
        if(blacklisteToken && blacklisteToken===token){
            throw new CustomError(HTTP_STATUS.BAD_REQUEST,"Link has been used once")
        }

        //expiry calculation
        const tokenExpiry=payload.exp as number
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = tokenExpiry-currentTime
        console.log(remainingTime)

        //checking is user exists
        const user = await this._userRepository.findByEmail(email)
        if(!user) throw new NotFoundError('user not found');


        //updation credentials
        const filter={email};
        const hashedPassword =await hashPassword(password)
        const update={password:hashedPassword}
        const asyncOperations=[]

        //updation
        asyncOperations.push(this._userRepository.updateOne(filter,update))
        //blacklisting
        asyncOperations.push(this._blackListTokenRepository.blacklistToken(fieldName,remainingTime,token))
        await this._userRepository.updateOne(filter,update)
    }
}