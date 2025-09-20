import { WeekSlotsRequestDTO } from "application/dto/slotDTO";

export interface IUpdateSlotUsecase {
  execute(mentorId: string, weekSlots: WeekSlotsRequestDTO): Promise<void>;
}
