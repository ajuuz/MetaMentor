import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IWalletRepository } from "entities/repositoryInterfaces/walletRepository.inteface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { IGoogleAuthUsecase } from "entities/usecaseInterfaces/auth/googleAuthUsecase.interface";
import { FirebaseAdminConfig } from "frameworks/firebase/firebaseAdmin";
import { JwtPayload } from "jsonwebtoken";
import { loginResponseDTO, SignupRequestDto } from "shared/dto/authDTO";
import { AuthError } from "shared/utils/error/authError";
import { CustomError } from "shared/utils/error/customError";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";



@injectable()
export class GoogleAuthUsecase implements IGoogleAuthUsecase{

    constructor(
        @inject('IUserRepository')
        private _userRepository:IUserRespository,

        @inject('IStudentRepository')
        private _studentRepository:IStudentRepository,

        @inject('ITokenService')
        private _tokenService:ITokenService,

         @inject("IWalletRepository")
        private _walletRepository:IWalletRepository,
    ){}


    async execute(idToken:string):Promise<loginResponseDTO>{
        const admin = FirebaseAdminConfig.getInstance();
        const decode:JwtPayload=await admin.auth().verifyIdToken(idToken);
        const email:string=decode.email;

        let user=await this._userRepository.findByEmail(email);
        if(!user){
            const formData:Pick<SignupRequestDto,"name"|"googleId"|"email"|"profileImage"|"isVerified">={
                name:decode.name,
                profileImage:decode.picture,
                googleId:decode.user_id,
                email:decode.email,
                isVerified:true
            }
            user=await this._userRepository.createUser(formData);
            await this._studentRepository.createStudent(user._id);
            await this._walletRepository.insertOne({userId:user._id})
        }

        if(!user) throw new NotFoundError("user not found . some thing went wrong during google login");

        if(user.isBlocked) throw new CustomError(403,"User is blocked please contact admin")

        if(decode.user_id!==user.googleId) throw new AuthError(401,'Your google id is not matched')

        const accessToken = this._tokenService.generateAccessToken({id:user._id,email:user.email,role:user.role});
        const refreshToken = this._tokenService.generateRefreshToken({id:user._id,email:user.email,role:user.role});

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