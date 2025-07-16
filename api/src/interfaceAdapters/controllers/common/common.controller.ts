import { ICommonController } from "entities/controllerInterfaces/common/commonController.interface";
import { IUploadImageUsecase } from "entities/usecaseInterfaces/common/uploadImageUsecase.interface";
import { NextFunction, Request, Response } from "express";
import sseClientManager from "frameworks/SSE/sseClientManager";
import { ImageMulterResponseDTO } from "shared/dto/imageMulterDTO";
import { ModifiedRequest } from "shared/types";
import { inject, injectable } from "tsyringe";


interface MulterRequest extends Request{
    files: Express.Multer.File[];
}

@injectable()
export class CommonController implements ICommonController{

    constructor(
        @inject('IUploadImageUsecase')
        private _uploadImageUsecase : IUploadImageUsecase
    ){}

   async uploadImage(req:MulterRequest,res:Response,next:NextFunction):Promise<void>{
        try{
            const files:Express.Multer.File[]= req.files
            const uploadedFiles :ImageMulterResponseDTO= this._uploadImageUsecase.execute(files)
            res.status(200).json({success:true,message:"Image uploaded successfully!",data:uploadedFiles})
        }
        catch(error){
            console.log(error)
            next(error);
        }
   }

   async eventSource(req:Request,res:Response,next:NextFunction):Promise<void>{
        res.setHeader('Content-Type','text/event-stream')
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive');
        res.flushHeaders();
        const email = req.params.email
        sseClientManager.addClient(email,res)

        req.on('close',()=>{
            res.end()
        })
   }

   
}