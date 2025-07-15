import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { IUpdateSlotUsecase } from "entities/usecaseInterfaces/slot/updateSlotUsecase.interface";
import { WeekSlotsDTO } from "shared/dto/slotDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class UpdateSlotUsecase implements IUpdateSlotUsecase{

    constructor(
        @inject('ISlotRepository')
        private _slotRepository:ISlotRepository
    ){}
    async execute(mentorId:string,weekSlots:WeekSlotsDTO):Promise<void>{
        console.log("comes here")
        await this._slotRepository.updateSlot(mentorId,weekSlots)
    }
}