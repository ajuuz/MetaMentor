import { UpdateSlotStatusReqDTO } from "application/dto/requset/slot.dto";

export interface IUpdateSlotStatusUsecase {
  execute(
    mentorId: string,
    slotStatusUpdationDetails: UpdateSlotStatusReqDTO
  ): Promise<void>;
}
