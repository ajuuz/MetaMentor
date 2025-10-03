import { NotFoundError } from "domain/errors/notFounError";
import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";

import { WeekSlotDTO } from "application/dto/response/slot.dto";
import { IGetMentorSlotsUsecase } from "application/usecase/interfaces/slot/getMentorSlotsUsecase.interface";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMentorSlotsUsecase implements IGetMentorSlotsUsecase {
  constructor(
    @inject("ISlotRepository")
    private _slotRepository: ISlotRepository
  ) {}

  async execute(mentorId: string): Promise<WeekSlotDTO> {
    const fitler = { mentorId };
    const slot = await this._slotRepository.findOne(fitler);
    if (!slot) throw new NotFoundError("slots not found");
    const weekSlots = plainToInstance(WeekSlotDTO, slot.weekSlots, {
      excludeExtraneousValues: true,
    });
    return weekSlots;
  }
}
