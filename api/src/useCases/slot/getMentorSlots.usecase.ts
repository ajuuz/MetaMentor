import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { IGetMentorSlotsUsecase } from "entities/usecaseInterfaces/slot/getMentorSlotsUsecase.interface";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMentorSlotsUsecase implements IGetMentorSlotsUsecase{

    constructor(
        @inject('ISlotRepository')
        private _slotRepository:ISlotRepository
    ){}

    async execute(mentorId:string):Promise<Pick<ISlotEntity,'weekSlots'>>{
        const fitler={mentorId}
        const project={weekSlots:true,_id:false} as any
        const slot = await this._slotRepository.findOne(fitler,project)
        
        if(!slot) throw new NotFoundError("slots not found")
        return slot
    }
}