import { UpdateSlotStatusReqDTO } from "shared/dto/request/slot.dto";

export interface IUpdateSlotStatusUsecase {
  execute(
    mentorId: string,
    slotStatusUpdationDetails: UpdateSlotStatusReqDTO
  ): Promise<void>;
}
