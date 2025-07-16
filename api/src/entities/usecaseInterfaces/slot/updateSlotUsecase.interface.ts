import { WeekSlotsRequestDTO } from "shared/dto/slotDTO";


export interface IUpdateSlotUsecase{
    execute(mentorId:string,weekSlots:WeekSlotsRequestDTO):Promise<void>
}