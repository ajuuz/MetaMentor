import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { ITokenRefreshingUsecase } from "application/usecase/interfaces/auth/tokenRefreshing.interface";
import { JwtPayload } from "jsonwebtoken";
import { ERROR_MESSAGE, HTTP_STATUS, ROLES } from "shared/constants";
import { AuthError } from "domain/errors/authError";
import { inject, injectable } from "tsyringe";

@injectable()
export class TokenRefreshingUsecase implements ITokenRefreshingUsecase {
  constructor(
    @inject("ITokenService")
    private _tokenService: ITokenService
  ) {}
  execute(token: string): string {
    if (!token)
      throw new AuthError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGE.UNAUTHORIZED_ACCESS_NOT_LOGIN
      );
    const user: JwtPayload = this._tokenService.verifyRefreshToken(token);
    const id = user.id;
    const email = user.email as string;
    const role = user.role as ROLES;
    const accessToken = this._tokenService.generateAccessToken({
      id,
      email,
      role,
    });
    return accessToken;
  }
}
