import { ISlotTime } from "entities/modelEntities/slotModel.entity";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { IGetSlotsForStudUsecase } from "entities/usecaseInterfaces/slot/getSlotsForStudUsecase.interface";
import { DAYS } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetSlotsForStudUsecase implements IGetSlotsForStudUsecase {
  constructor(
    @inject("ISlotRepository")
    private _slotRepository: ISlotRepository
  ) {}
  async execute(mentorId: string, day: DAYS): Promise<ISlotTime[]> {
    const slots=await this._slotRepository.findAllSlotsOfaDay(mentorId, day)
    return slots
  }
}
