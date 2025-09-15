import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";
import { IUpdateSlotUsecase } from "entities/usecaseInterfaces/slot/updateSlotUsecase.interface";
import { WeekSlotsRequestDTO } from "shared/dto/slotDTO";
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
