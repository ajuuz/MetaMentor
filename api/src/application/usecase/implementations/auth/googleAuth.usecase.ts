import { IStudentRepository } from "domain/repositoryInterfaces/student-repository.interface";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IWalletRepository } from "domain/repositoryInterfaces/walletRepository.inteface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { IGoogleAuthUsecase } from "application/usecase/interfaces/auth/googleAuthUsecase.interface";
import { FirebaseAdminConfig } from "frameworks/firebase/firebaseAdmin";
import { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AuthError } from "domain/errors/authError";
import { CustomError } from "domain/errors/customError";
import { NotFoundError } from "domain/errors/notFounError";
import { IGoogleRegisterData } from "shared/dto/request/auth.dto";
import { HTTP_STATUS } from "shared/constants";
import { plainToInstance } from "class-transformer";
import { LoginResDTO } from "shared/dto/response/auth.dto";

@injectable()
export class GoogleAuthUsecase implements IGoogleAuthUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("IStudentRepository")
    private _studentRepository: IStudentRepository,

    @inject("ITokenService")
    private _tokenService: ITokenService,

    @inject("IWalletRepository")
    private _walletRepository: IWalletRepository
  ) {}

  async execute(idToken: string): Promise<{
    userData: LoginResDTO;
    accessToken: string;
    refreshToken: string;
  }> {
    const admin = FirebaseAdminConfig.getInstance();
    const decode: JwtPayload = await admin.auth().verifyIdToken(idToken);
    const email: string = decode.email;

    let user = await this._userRepository.findByEmail(email);
    if (!user) {
      const formData: IGoogleRegisterData = {
        name: decode.name,
        profileImage: decode.picture,
        googleId: decode.user_id,
        email: decode.email,
        isVerified: true,
      };
      user = await this._userRepository.createUser(formData);
      await this._studentRepository.createStudent(user._id);
      await this._walletRepository.insertOne({ userId: user._id });
    }

    if (!user)
      throw new NotFoundError(
        "user not found. Some thing went wrong during google login"
      );

    if (user.isBlocked)
      throw new CustomError(
        HTTP_STATUS.FORBIDDEN,
        "User is blocked please contact admin"
      );

    if (decode.user_id !== user.googleId)
      throw new AuthError(
        HTTP_STATUS.UNAUTHORIZED,
        "Your google id is not matched"
      );

    const accessToken = this._tokenService.generateAccessToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this._tokenService.generateRefreshToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    const userData = plainToInstance(LoginResDTO, user, {
      excludeExtraneousValues: true,
    });

    const userDetails = {
      userData,
      accessToken,
      refreshToken,
    };
    return userDetails;
  }
}
