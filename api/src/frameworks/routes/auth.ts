import {Request,Response,Router } from 'express';
import { authController } from 'frameworks/di/resolver';


export class AuthRoutes {
    private _router: Router;

    constructor() {
        this._router = Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this._router.post('/signup', (req: Request, res: Response) => {
            authController.signup(req, res)
        });

        this._router.post('/verifyOtp', (req: any, res: any) => {
            authController.verifyOtp(req,res)
        });
    }

    public getRouter(): Router {
        return this._router;
    }
}    