import { WeekSlotsDTO } from "shared/dto/slotDTO";


export interface IUpdateSlotUsecase{
    execute(mentorId:string,weekSlots:WeekSlotsDTO):Promise<void>
}