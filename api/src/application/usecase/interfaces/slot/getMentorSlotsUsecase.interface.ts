import { WeekSlotDTO } from "application/dto/response/slot.dto";

export interface IGetMentorSlotsUsecase {
  execute(mentorId: string): Promise<WeekSlotDTO>;
}
