import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";

import { WeekSlotsRequestDTO } from "application/dto/slotDTO";
import { IUpdateSlotUsecase } from "application/usecase/interfaces/slot/updateSlotUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateSlotUsecase implements IUpdateSlotUsecase {
  constructor(
    @inject("ISlotRepository")
    private _slotRepository: ISlotRepository
  ) {}
  async execute(
    mentorId: string,
    weekSlots: WeekSlotsRequestDTO
  ): Promise<void> {
    await this._slotRepository.updateSlots(mentorId, weekSlots);
  }
}
