import { IUserSlotController } from "entities/controllerInterfaces/user/userSlotController.interface";
import { IGetDomainSlotsUsecase } from "entities/usecaseInterfaces/slot/getDomainSlotsUsecase.interface";
import { ISlotValidityCheckerUsecase } from "entities/usecaseInterfaces/slot/slotValidityCheckerUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class UserSlotController implements IUserSlotController{

    constructor(
        @inject('IGetDomainSlotsUsecase')
        private _getDomainSlotsUsecase:IGetDomainSlotsUsecase,

        @inject('ISlotValidityCheckerUsecase')
        private _slotValidityCheckerUsecase:ISlotValidityCheckerUsecase
    ){}


    async getDomainSlots(req:Request,res:Response,next:NextFunction):Promise<void>{
        const domainId = req.params.domainId;
        if(!domainId) throw new ValidationError()
        const slots = await this._getDomainSlotsUsecase.execute(domainId);
        res.status(200).json({success:true,message:'slots fetched successfully',data:slots})
    }

    async slotValidityChecker(req:Request,res:Response,next:NextFunction):Promise<void>{
        const {mentorId,day,slotId} = req.params;
        if(!mentorId || !day ||!slotId) throw new ValidationError();

        const value=await this._slotValidityCheckerUsecase.execute(mentorId,day,slotId)
    }
}