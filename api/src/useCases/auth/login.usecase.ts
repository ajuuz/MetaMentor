import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { ILoginUsecase } from "entities/usecaseInterfaces/auth/loginUsecase.interface";
import { TokenService } from "interfaceAdapters/services/token.service";
import { loginResponseDTO } from "shared/dto/authDTO";
import { CustomError } from "shared/utils/error/customError";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class LoginUsecase implements ILoginUsecase{

    constructor(
        @inject("IUserRepository")
        private _userRepository: IUserRespository,


    ){}

     async execute(email:string,password:string):Promise<loginResponseDTO>{
            
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
    
            // if(user.isBlocked){
            //     throw new CustomError(403,"Admin has been blocked you. please contact admin")
            // }
    
            const accessToken = TokenService.generateAccessToken({id:user._id,email:user.email,role:user.role});
            const refreshToken = TokenService.generateRefreshToken({id:user._id,email:user.email,role:user.role});
    
            const userDetails:loginResponseDTO={
                name:user.name,
                email:user.email,
                role:user.role,
                accessToken,
                refreshToken
            }
            return userDetails;
        }
}