import { NextFunction, Request, Response, Router } from "express";
import { upload } from "frameworks/cloudinary/cloudinary";
import { authMiddleware, commonController } from "frameworks/di/resolver";

interface MulterRequest extends Request{
    files: Express.Multer.File[];
}


export class CommonRoutes{

    private _router:Router;

    constructor(){
        this._router = Router();
        this.configureRoutes()
    }

    configureRoutes():void{
        this._router.post('/images/upload',
            authMiddleware.verifyAuth.bind(authMiddleware),
            authMiddleware.blockChecker.bind(authMiddleware),
            upload.array("image",5),
            (req:Request,res:Response,next:NextFunction) => {commonController.uploadImage(req as MulterRequest,res,next)});

        this._router.get('/eventSource/:email',commonController.eventSource.bind(commonController))
    }

    getRouter():Router{
        return this._router;
    }
}