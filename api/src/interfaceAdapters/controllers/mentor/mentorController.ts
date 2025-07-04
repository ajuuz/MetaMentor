import { IMentorController } from "entities/controllerInterfaces/mentor/mentorController.interface";
import { IRegisterMentorUsecase } from "entities/usecaseInterfaces/mentor/registerMentorUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import { HTTP_STATUS } from "shared/constants";
import { MentorRegisterRequestDTO } from "shared/dto/mentorDTO";
import { refreshTokenDecoder } from "shared/utils/token/decodeRefreshToken";
import { inject, injectable } from "tsyringe";

@injectable()
export class MentorController implements IMentorController{

    constructor(
        @inject('IRegisterMentorUsecase')
        private _registerMentorUsecase:IRegisterMentorUsecase
    ){}
    async registerForm(req:Request,res:Response,next:NextFunction):Promise<void>{
        const mentorDetails:MentorRegisterRequestDTO=req.body;
        const userId:string=refreshTokenDecoder(req);
        try{
            await this._registerMentorUsecase.execute(userId,mentorDetails)
            res.status(HTTP_STATUS.CREATED).json({success:true,message:"mentor registered successfully"})
        }catch(error){
            console.log(error)
            next(error)
        }
    }

   
}