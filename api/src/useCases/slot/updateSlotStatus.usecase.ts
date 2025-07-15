import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { IUpdateSlotStatusUsecase } from "entities/usecaseInterfaces/slot/updateSlotStatusUsecase.interface";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateSlotStatusUsecase implements IUpdateSlotStatusUsecase{

    constructor(
        @inject('ISlotRepository')
        private _slotRepository:ISlotRepository
    ){}

    async execute(mentorId:string,day:string,slotId:string,slotStatus:boolean):Promise<void>{
        await this._slotRepository.updateSlotStatus(mentorId,day,slotId,slotStatus)        
    }
}