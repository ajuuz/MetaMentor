import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { ISlotValidityCheckerUsecase } from "entities/usecaseInterfaces/slot/slotValidityCheckerUsecase.interface";
import { ERROR_MESSAGE, HTTP_STATUS } from "shared/constants";
import { SlotDTO } from "shared/dto/slotDTO";
import { CustomError } from "shared/utils/error/customError";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";


@injectable()
export class SlotValidityCheckerUsecase implements ISlotValidityCheckerUsecase{

    constructor(
        @inject('ISlotRepository')
        private _slotRepository:ISlotRepository,
        
    ){}

    async execute(mentorId:string,day:string,slotId:string):Promise<void>{
        const slot:SlotDTO|null= await this._slotRepository.getSpecificSlot(mentorId,day,slotId);

        if(!slot) throw new NotFoundError("Slot not Found");
        if(!slot.enabled) throw new CustomError(HTTP_STATUS.GONE,ERROR_MESSAGE.SLOT.GONE);

        
    }
}