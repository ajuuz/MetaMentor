import { IAdminMentorController } from "entities/controllerInterfaces/admin/adminMentorController.interface";
import { IAcceptMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/acceptMentorApplicationUsecase.interface";
import { IGetNotVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getNotVerifiedMentorsUsecase.interface";
import { IGetSpecificMentorUsecase } from "entities/usecaseInterfaces/mentor/getSpecificMentorUsecase.interface";
import { IGetVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getVerifiedMentors.interface";
import { IRejectMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/rejectMentorApplication.interface";
import { IUpdateMentorStatusUsecase } from "entities/usecaseInterfaces/mentor/updateMentorStatusUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { MENTOR_APPLICATION_STATUS } from "shared/constants";
import { MentorDataDTO } from "shared/dto/mentorDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class AdminMentorController implements IAdminMentorController{

    constructor(
         @inject('IGetNotVerifiedMentorsUsecase')
        private _getNotVerifiedMentorsUsecase:IGetNotVerifiedMentorsUsecase,

         @inject('IGetVerifiedMentorsUsecase')
        private _getVerifiedMentorsUsecase:IGetVerifiedMentorsUsecase,

        @inject('IGetSpecificMentorUsecase')
        private _getSpecificMentorUsecase:IGetSpecificMentorUsecase,

        @inject('IAcceptMentorApplicationUsecase')
        private _acceptMentorApplicationUsecase:IAcceptMentorApplicationUsecase,

        @inject('IRejectMentorApplicationUsecase')
        private _rejectMentorApplicationUsecase:IRejectMentorApplicationUsecase,

        @inject('IUpdateMentorStatusUsecase')
        private _updateMentorStatusUsecase:IUpdateMentorStatusUsecase

    ){}
   

     async  getAllMentors(req:Request,res:Response,next:NextFunction):Promise<void>{
            const currentPage:number=Number(req.query.currentPage ?? "1");
            const limit:number=Number(req.query.limit ?? '10')
            const isVerified:boolean=req.query.isVerified==="true"?true:false;

            let repo:IGetNotVerifiedMentorsUsecase|IGetVerifiedMentorsUsecase;
            if(!isVerified){
                repo = this._getNotVerifiedMentorsUsecase
            }else{
                repo = this._getVerifiedMentorsUsecase
            }
            try{
                const {mentors,totalPages} = await repo.execute(currentPage,limit);
                res.status(200).json({success:true,message:'mentors fetched successfully',data:{mentors,totalPages}})
            }catch(error){
                next(error)
            }
    }

    async getSpecificMentor(req:Request,res:Response,next:NextFunction):Promise<void>{
            const mentorId :string=req.params.mentorId;
            try{
                const mentor:MentorDataDTO = await this._getSpecificMentorUsecase.execute(mentorId)
                res.status(200).json({success:true,message:'mentor fetched successfully',data:mentor})
            }
            catch(error){
                next(error)
            }
    }

    async mentorApplicationVerification(req:Request,res:Response,next:NextFunction):Promise<void>{
        const mentorId:string = req.params.mentorId
        const applicationStatus:string = req.params.applicationStatus;
        const email:string = req.body.email;
        const reason:string=req.body.reason

        if(applicationStatus===MENTOR_APPLICATION_STATUS.ACCEPTED){
            await this._acceptMentorApplicationUsecase.execute(mentorId,email)
            res.status(200).json({success:true,message:"Mentor Application Accepted Successfully"})
        }else{
            await this._rejectMentorApplicationUsecase.execute(mentorId,email,reason)
            res.status(200).json({success:true,message:"Mentor Application Rejected Successfully"})
        }
    }

    async updateMentorStatus(req:Request,res:Response,next:NextFunction):Promise<void>{
        const mentorId:string=req.params.mentorId
        const status:boolean=req.body.status;
        console.log(status)

        await this._updateMentorStatusUsecase.execute(mentorId,status);
        res.status(200).json({success:true,message:`mentor ${status?"blocked":"unblocked"} successfully`})
    }
}