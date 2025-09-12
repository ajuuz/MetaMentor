import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import ms from "ms";
import { config } from "shared/config";
import { ERROR_MESSAGE, HTTP_STATUS, ROLES } from "shared/constants";
import { CustomError } from "shared/utils/error/customError";
import { injectable } from "tsyringe";

@injectable()
export class TokenService implements ITokenService {
  private _accessSecretKey: Secret;
  private _accessExpiresIn: string;
  private _refreshSecretKey: Secret;
  private _refreshExpiresIn: string;
  private _forgotPasswordSecretKey: Secret;
  private _forgotPasswordExpiresIn: string;

  constructor() {
    this._forgotPasswordSecretKey = config.jwt.FORGOT_PASSWORD_SECRET_KEY;
    this._forgotPasswordExpiresIn = config.jwt.FORGOT_PASSWORD_EXPIRES_IN;
    this._accessSecretKey = config.jwt.ACCESS_SECRET_KEY;
    this._accessExpiresIn = config.jwt.ACCESS_EXPIRES_IN;
    this._refreshSecretKey = config.jwt.REFRESH_SECRET_KEY;
    this._refreshExpiresIn = config.jwt.REFRESH_EXPIRES_IN;
  }

  generateForgotPasswordToken(email: string): string {
    const token = jwt.sign({ email }, this._forgotPasswordSecretKey, {
      expiresIn: this._forgotPasswordExpiresIn as ms.StringValue,
    });
    return token;
  }

  verifyForgotPasswordToken(token: string): JwtPayload {
    try {
      const decode = jwt.verify(token, this._forgotPasswordSecretKey);
      return decode as JwtPayload;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "TokenExpiredError") {
          throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGE.TOKEN_EXPIRED_FORGOT
          );
        } else if (error.name === "JsonWebTokenError") {
          throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGE.INVALID_TOKEN
          );
        }
      }
      throw new CustomError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGE.UNAUTHORIZED_ACCESS
      );
    }
  }

  generateAccessToken(payload: {
    id: ObjectId;
    email: string;
    role: ROLES;
  }): string {
    const token = jwt.sign(payload, this._accessSecretKey, {
      expiresIn: this._accessExpiresIn as ms.StringValue,
    });
    return token;
  }

  generateRefreshToken(payload: {
    id: ObjectId;
    email: string;
    role: ROLES;
  }): string {
    const token = jwt.sign(payload, this._refreshSecretKey, {
      expiresIn: this._refreshExpiresIn as ms.StringValue,
    });
    return token;
  }

  verifyAccessToken(token: string): JwtPayload {
    try {
      const decode = jwt.verify(token, this._accessSecretKey);
      return decode as JwtPayload;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "TokenExpiredError") {
          throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGE.TOKEN_EXPIRED_ACCESS
          );
        } else if (error.name === "JsonWebTokenError") {
          throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGE.INVALID_TOKEN
          );
        }
      }
      throw new CustomError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGE.UNAUTHORIZED_ACCESS
      );
    }
  }

  verifyRefreshToken(token: string): JwtPayload {
    try {
      const decode = jwt.verify(token, this._refreshSecretKey);
      return decode as JwtPayload;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "TokenExpiredError") {
          throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGE.TOKEN_EXPIRED_REFRESH
          );
        } else if (error.name === "JsonWebTokenError") {
          throw new CustomError(
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_MESSAGE.INVALID_TOKEN
          );
        }
      }
      throw new CustomError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_MESSAGE.UNAUTHORIZED_ACCESS
      );
    }
  }
}
