import { IMentorSlotController } from "entities/controllerInterfaces/mentor/slotController.inteface";
import { IUpdateSlotUsecase } from "entities/usecaseInterfaces/slot/updateSlotUsecase.interface";
import { IGetMentorSlotsUsecase } from "entities/usecaseInterfaces/slot/getMentorSlotsUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { ModifiedRequest } from "shared/types";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";
import { IUpdateSlotStatusUsecase } from "entities/usecaseInterfaces/slot/updateSlotStatusUsecase.interface";


@injectable()
export class MentorSlotController implements IMentorSlotController{

   constructor(
      @inject('IUpdateSlotUsecase')
      private _updateSlotUsecase:IUpdateSlotUsecase,

      @inject('IGetMentorSlotsUsecase')
      private _IGetMentorSlotsUsecase:IGetMentorSlotsUsecase,

      @inject('IUpdateSlotStatusUsecase')
      private _updateSlotStatusUsecase:IUpdateSlotStatusUsecase,
   ){}
     
     async updateSlot(req:Request,res:Response,next:NextFunction):Promise<void>{
        const weekSlots = req.body.weekSlots;
        const mentorId = (req as ModifiedRequest).user.id;
        if(!weekSlots) throw new ValidationError("Slots havent recieved")
        
         await this._updateSlotUsecase.execute(mentorId,weekSlots)
         res.status(201).json({success:true,message:"Slot updated Successfully"})
     }

     async getSlots(req:Request,res:Response,next:NextFunction):Promise<void>{
        const mentorId = (req as ModifiedRequest).user.id;
        
         const slot = await this._IGetMentorSlotsUsecase.execute(mentorId)
         res.status(201).json({success:true,message:"Slot fetched Successfully",data:slot})
     }

     async updateSlotStatus(req:Request,res:Response,next:NextFunction):Promise<void>{
         const mentorId = (req as ModifiedRequest).user.id;
         const slotId = req.params.slotId;
         const day = req.params.day;
         const slotStatus = req.body.slotStatus;

         if(!mentorId || !day || !slotId || (slotStatus!==false && !slotStatus)){
             throw new ValidationError('Necessary Credential not recieved');
         }

        await this._updateSlotStatusUsecase.execute(mentorId,day,slotId,slotStatus)
        res.status(200).json({success:true,message:"slot status updated successfully"})
     }
}