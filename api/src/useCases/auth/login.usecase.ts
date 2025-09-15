import { plainToInstance } from "class-transformer";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { ILoginUsecase } from "entities/usecaseInterfaces/auth/loginUsecase.interface";
import { ROLES } from "shared/constants";
import { LoginResDTO } from "shared/dto/response/auth.dto";
import { comparePassword } from "shared/utils/bcryptHelper";
import { CustomError } from "domain/errors/customError";
import { NotFoundError } from "domain/errors/notFounError";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class LoginUsecase implements ILoginUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("ITokenService")
    private _tokenService: ITokenService
  ) {}

  async execute(
    email: string,
    password: string
  ): Promise<{
    userData: LoginResDTO;
    accessToken: string;
    refreshToken: string;
  }> {
    if (!email || !password) {
      throw new ValidationError();
    }
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("Signup first to login");
    }

    const userPassword = user.password;
    if (!userPassword) throw new CustomError(400, "try google login");

    const isMatch = await comparePassword(password, userPassword);
    if (!isMatch) {
      throw new NotFoundError("Invalid Credential");
    }

    if (user.role !== ROLES.ADMIN) {
      if (!user.isVerified) {
        throw new CustomError(401, "Verify otp to create account");
      }

      if (user.isBlocked) {
        throw new CustomError(
          403,
          "Admin has been blocked you. please contact admin"
        );
      }
    }

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

    return { userData, accessToken, refreshToken };
  }
}
