import { NextFunction, Request, Response, Router } from "express";
import { upload } from "frameworks/cloudinary/cloudinary";
import { authMiddleware, commonController, paymentController } from "frameworks/di/resolver";
import { ROLES } from "shared/constants";

interface MulterRequest extends Request{
    files: Express.Multer.File[];
}


export class PaymentRoutes{

    private _router:Router;

    constructor(){
        this._router = Router();
        this.configureRoutes()
    }

    configureRoutes():void{
        this._router.post('/createOrder',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),paymentController.createOrder.bind(paymentController))
        this._router.post('/verifyPayment',authMiddleware.verifyAuth.bind(authMiddleware),authMiddleware.verifyAuthRole([ROLES.USER,ROLES.MENTOR]),authMiddleware.blockChecker.bind(authMiddleware),paymentController.verifyPayment.bind(paymentController))
    }

    getRouter():Router{
        return this._router;
    }
}