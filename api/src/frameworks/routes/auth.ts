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

        this._router.post('/verifyOtp', (req: Request, res: Response,next:NextFunction) => {
            authController.verifyOtp(req,res,next)
        });

        this._router.post('/login',(req:Request,res:Response,next:NextFunction)=>{
            authController.login(req,res,next)
        })

        this._router.post('/refresh',authController.tokenRefreshing.bind(authController))
    }

    public getRouter(): Router {
        return this._router;
    }
}    