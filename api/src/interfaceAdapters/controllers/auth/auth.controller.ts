import { IAuthController } from "entities/controllerInterfaces/auth/authController.interface";
import { IForgotPasswordSendMailUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordMailUsecase.interface";
import { IForgotPasswordResetUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordResetUsecase.interface";
import { IGoogleAuthUsecase } from "entities/usecaseInterfaces/auth/googleAuthUsecase.interface";
import { ILoginUsecase } from "entities/usecaseInterfaces/auth/loginUsecase.interface";
import { ILogoutUsecase } from "entities/usecaseInterfaces/auth/logoutUsecase.interface";
import { IRegisterUserUsecase } from "entities/usecaseInterfaces/auth/registerUsecase.interface";
import { IResendOtpUsecase } from "entities/usecaseInterfaces/auth/resendOtpUsecase.interface";
import { ITokenRefreshingUsecase } from "entities/usecaseInterfaces/auth/tokenRefreshing.interface";
import { IVerifyOtpUsecase } from "entities/usecaseInterfaces/auth/verifyOtpUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS, SUCCESS_MESSAGE } from "shared/constants";
import {
  ForgotPasswordResetReqDTO,
  ForgotPasswordSendMailReqDTO,
  GoogleRegisterDTO,
  LoginReqDTO,
  OtpReqDTO,
  ResendOtpReqDTO,
  UserRegisterDTO,
} from "shared/dto/request/auth.dto";
import {
  clearCookies,
  setAccessCookie,
  setCookie,
} from "shared/utils/cookeHelper";
import { ValidationError } from "domain/errors/validationError";
import { ISuccessResponseHandler } from "shared/utils/successResponseHandler";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class AuthController implements IAuthController {
  constructor(
    @inject("IRegisterUserUsecase")
    private _RegisterUserUsecase: IRegisterUserUsecase,

    @inject("IVerifyOtpUsecase")
    private _VerifyOtpUsecase: IVerifyOtpUsecase,

    @inject("ILoginUsecase")
    private _LoginUsecase: ILoginUsecase,

    @inject("IGoogleAuthUsecase")
    private _googleAuthUsecase: IGoogleAuthUsecase,

    @inject("ILogoutUsecase")
    private _logoutUsecase: ILogoutUsecase,

    @inject("IResendOtpUsecase")
    private _resendOtpUsecase: IResendOtpUsecase,

    @inject("IForgotPasswordSendMailUsecase")
    private _forgotPasswordSendMailUsecase: IForgotPasswordSendMailUsecase,

    @inject("IForgotPasswordResetUsecase")
    private _forgotPasswordResetUsecase: IForgotPasswordResetUsecase,

    @inject("ITokenRefreshingUsecase")
    private _tokenRefreshingUsecase: ITokenRefreshingUsecase
  ) {}

  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const formData: UserRegisterDTO = req.verifiedData;
      const response: ISuccessResponseHandler =
        await this._RegisterUserUsecase.execute(formData);
      res.status(response.statusCode).json(response.content);
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, otp }: OtpReqDTO = req.verifiedData;

      await this._VerifyOtpUsecase.execute(email, otp);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, message: SUCCESS_MESSAGE.AUTH.CREATED });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password }: LoginReqDTO = req.verifiedData;
    const details = await this._LoginUsecase.execute(email, password);
    const { userData: user, accessToken, refreshToken } = details;
    setCookie(res, accessToken, refreshToken);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGE.AUTH.LOGIN,
      data: user,
    });
  }

  async googleAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { idToken }: GoogleRegisterDTO = req.verifiedData;

    try {
      const details = await this._googleAuthUsecase.execute(idToken);
      const { userData: user, accessToken, refreshToken } = details;
      console.log(user);
      setCookie(res, accessToken, refreshToken);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGE.AUTH.GOOGLE_LOGIN,
        data: user,
      });
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code: string }).code === "auth/argument-error"
      ) {
        next(new ValidationError("Invalid googleId token"));
      }
      next(error);
    }
  }

  async resendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email }: ResendOtpReqDTO = req.verifiedData;

    await this._resendOtpUsecase.execute(email);
    res
      .status(200)
      .json({ success: true, message: SUCCESS_MESSAGE.AUTH.RESEND_OTP });
  }

  async forgotPasswordSendMail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email }: ForgotPasswordSendMailReqDTO = req.body;

    await this._forgotPasswordSendMailUsecase.execute(email);
    res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGE.AUTH.FORGOT_PASSWORD_SEND_MAIL,
    });
  }

  async forgotPasswordReset(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { password, token }: ForgotPasswordResetReqDTO = req.verifiedData;
    await this._forgotPasswordResetUsecase.execute(password, token);
    res
      .status(200)
      .json({ success: true, message: SUCCESS_MESSAGE.AUTH.FORGOT_PASSWORD });
  }

  async tokenRefreshing(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const refreshToken = req.cookies.refreshToken;
    const accessToken = this._tokenRefreshingUsecase.execute(refreshToken);
    setAccessCookie(res, accessToken);
    res
      .status(200)
      .json({ success: true, message: "token refreshed successfully" });
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId: string = (req as ModifiedRequest).user.id;
    clearCookies(res);
    await this._logoutUsecase.execute(userId);
    res.status(200).json({
      success: true,
      message: "you have been logged out successfully",
    });
  }
}
