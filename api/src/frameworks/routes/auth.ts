import {NextFunction, Request,Response,Router } from 'express';
import { authController } from 'frameworks/di/resolver';


export class AuthRoutes {
    private _router: Router;

    constructor() {
        this._router = Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this._router.post('/signup', (req: Request, res: Response,next:NextFunction) => {
            authController.signup(req,res,next)
        });

        this._router.post('/otp/verify', (req: Request, res: Response,next:NextFunction) => {
            authController.verifyOtp(req,res,next)
        });

        this._router.post('/login',authController.login.bind(authController))

        this._router.post('/googleAuth',authController.googleAuth.bind(authController))

        this._router.post('/otp/resend',authController.resendOtp.bind(authController))

        this._router.post('/forgotPassword/mail',authController.forgotPasswordSendMail.bind(authController))

        this._router.patch('/forgotPassword/reset',authController.forgotPasswordReset.bind(authController))

        this._router.post('/refresh',authController.tokenRefreshing.bind(authController))

        this._router.post('/logout',authController.logout.bind(authController))
    }

    public getRouter(): Router {
        return this._router;
    }
}    