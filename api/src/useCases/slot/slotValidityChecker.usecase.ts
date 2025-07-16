import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
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

        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository,
        
    ){}

    async execute(mentorId:string,day:string,slotId:string):Promise<void>{
        const slot:SlotDTO|null= await this._slotRepository.getSpecificSlot(mentorId,day,slotId);

        if(!slot) throw new NotFoundError("Slot not Found");
        if(!slot.enabled) throw new CustomError(HTTP_STATUS.UNPROCESSED_ENTITY,ERROR_MESSAGE.SLOT.UNPROCESSED_ENTITY);

        const isBooked = await this._reviewRepository.checkIsBookedSlot(mentorId,day,slot.start,slot.end);
        if(isBooked) throw new CustomError(HTTP_STATUS.CONFLICT,ERROR_MESSAGE.SLOT.CONFLICT);
    }
}