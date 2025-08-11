import { NextFunction, Request, Response, Router } from "express";
import { authController, authMiddleware } from "frameworks/di/resolver";
import { validationMiddleware } from "interfaceAdapters/middlewares/validation.middleware";
import {
  ForgotPasswordResetReqDTO,
  ForgotPasswordSendMailReqDTO,
  GoogleRegisterDTO,
  LoginReqDTO,
  OtpReqDTO,
  ResendOtpReqDTO,
  UserRegisterDTO,
} from "shared/dto/request/auth.dto";

export class AuthRoutes {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this._router.post(
      "/signup",
      validationMiddleware(UserRegisterDTO),
      (req: Request, res: Response, next: NextFunction) => {
        authController.signup(req, res, next);
      }
    );

    this._router.post(
      "/otp/verify",
      validationMiddleware(OtpReqDTO),
      (req: Request, res: Response, next: NextFunction) => {
        authController.verifyOtp(req, res, next);
      }
    );

    this._router.post("/login",
        validationMiddleware(LoginReqDTO),
        authController.login.bind(authController));

    this._router.post(
      "/googleAuth",
      validationMiddleware(GoogleRegisterDTO),
      authController.googleAuth.bind(authController)
    );

    this._router.post(
      "/otp/resend",
      validationMiddleware(ResendOtpReqDTO),
      authController.resendOtp.bind(authController)
    );

    this._router.post(
      "/forgotPassword/mail",
      validationMiddleware(ForgotPasswordSendMailReqDTO),
      authController.forgotPasswordSendMail.bind(authController)
    );

    this._router.patch(
      "/forgotPassword/reset",
      validationMiddleware(ForgotPasswordResetReqDTO),
      authController.forgotPasswordReset.bind(authController)
    );

    this._router.post(
      "/refresh",
      authController.tokenRefreshing.bind(authController)
    );

    this._router.post(
      "/logout",
      authMiddleware.verifyAuth.bind(authMiddleware),
      authController.logout.bind(authController)
    );
  }

  public getRouter(): Router {
    return this._router;
  }
}
