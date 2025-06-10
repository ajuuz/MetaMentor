import { ICommonController } from "entities/controllerInterfaces/common/commonController.interface";
import { IUploadImageUsecase } from "entities/usecaseInterfaces/common/uploadImageUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { ImageMulterResponseDTO } from "shared/dto/imageMulterDTO";
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
            next(error);
        }
   }
}