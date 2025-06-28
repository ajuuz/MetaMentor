import { Router } from "express";
import { authMiddleware, userController } from "frameworks/di/resolver";
import { ROLES } from "shared/constants";



export class UserRoutes{

    private _router:Router

    constructor(){
        this._router = Router();
        this.configureRoutes();
    }

    private configureRoutes():void{
        this._router.get('/user',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userController.getDetails.bind(userController))
        this._router.patch('/user',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),userController.updateUser.bind(userController))
    }

    getRouter():Router{
        return this._router;
    }
}