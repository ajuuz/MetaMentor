import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import { ISlotModel } from "frameworks/database/models/slot.model";
import { BaseRepository } from "interfaceAdapters/repositories/base.repository";
import { DomainSlotsResponseDTO, SlotDTO, WeekSlotsRequestDTO } from "shared/dto/slotDTO";



export interface ISlotRepository extends BaseRepository<ISlotEntity,ISlotModel>{
    updateSlots(mentorId:string,weekSlots:WeekSlotsRequestDTO):Promise<void>
    createSlots(mentorId:string):Promise<void>
    updateSlotStatus(mentorId:string,day:string,slotId:string,slotStatus:boolean):Promise<void>
    getSlotsByDomains(domainId:string):Promise<DomainSlotsResponseDTO[]>
    getSpecificSlot(mentorId:string,day:string,slotId:string):Promise<SlotDTO|null>
}