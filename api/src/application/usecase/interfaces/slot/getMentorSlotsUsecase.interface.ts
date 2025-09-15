import { WeekSlotDTO } from "shared/dto/response/slot.dto";



export interface IGetMentorSlotsUsecase{
    execute(mentorId:string):Promise<WeekSlotDTO>
}