import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";
import { IUpdateSlotStatusUsecase } from "application/usecase/interfaces/slot/updateSlotStatusUsecase.interface";
import { UpdateSlotStatusReqDTO } from "application/dto/requset/slot.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateSlotStatusUsecase implements IUpdateSlotStatusUsecase {
  constructor(
    @inject("ISlotRepository")
    private _slotRepository: ISlotRepository
  ) {}

  async execute(
    mentorId: string,
    slotStatusUpdationDetails: UpdateSlotStatusReqDTO
  ): Promise<void> {
    const { day, slotId, slotStatus } = slotStatusUpdationDetails;
    await this._slotRepository.updateSlotStatus(
      mentorId,
      day,
      slotId,
      slotStatus
    );
  }
}
