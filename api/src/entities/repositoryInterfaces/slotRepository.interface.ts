import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import { ISlotModel } from "frameworks/database/models/slot.model";
import { BaseRepository } from "interfaceAdapters/repositories/base.repository";
import { WeekSlotsDTO } from "shared/dto/slotDTO";



export interface ISlotRepository extends BaseRepository<ISlotEntity,ISlotModel>{
    updateSlot(mentorId:string,weekSlots:WeekSlotsDTO):Promise<void>
    createSlots(mentorId:string):Promise<void>
    updateSlotStatus(mentorId:string,day:string,slotId:string,slotStatus:boolean):Promise<void>
}