import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import { BaseRepository } from "./base.repository";
import { ISlotModel, slotModel } from "frameworks/database/models/slot.model";
import { WeekSlotsDTO } from "shared/dto/slotDTO";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";


export class SlotRepository extends BaseRepository<ISlotEntity,ISlotModel> implements ISlotRepository{

    constructor(){
        super(slotModel)
    }
    
    async updateSlot(mentorId:string,weekSlots:WeekSlotsDTO):Promise<void>{
        await this.model.updateOne({mentorId},{weekSlots})
    }

    async createSlots(mentorId:string):Promise<void>{
         const slot = new slotModel({mentorId})
         await slot.save()
    }
}