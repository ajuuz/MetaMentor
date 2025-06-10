import { NextFunction, Request, Response, Router } from "express";
import { upload } from "frameworks/cloudinary/cloudinary";
import { commonController } from "frameworks/di/resolver";

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
        this._router.post('/images/upload',upload.array("image",5),(req:Request,res:Response,next:NextFunction) => {
        commonController.uploadImage(req as MulterRequest,res,next)
        });
    }

    getRouter():Router{
        return this._router;
    }
}