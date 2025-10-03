import { CustomError } from "domain/errors/customError";
import { NotFoundError } from "domain/errors/notFounError";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";

import { SlotDTO } from "application/dto/slotDTO";
import { ISlotValidityCheckerUsecase } from "application/usecase/interfaces/slot/slotValidityCheckerUsecase.interface";
import { ERROR_MESSAGE, HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class SlotValidityCheckerUsecase implements ISlotValidityCheckerUsecase {
  constructor(
    @inject("ISlotRepository")
    private _slotRepository: ISlotRepository,

    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(mentorId: string, date: string, slotId: string): Promise<void> {
    const start = new Date(date);
    const end = new Date(date);
    const day = start.toLocaleDateString("en-US", { weekday: "long" });
    const slot: SlotDTO | null = await this._slotRepository.getSpecificSlot(
      mentorId,
      day,
      slotId
    );
    if (!slot) throw new NotFoundError("Slot not Found");
    if (!slot.enabled)
      throw new CustomError(
        HTTP_STATUS.UNPROCESSED_ENTITY,
        ERROR_MESSAGE.SLOT.UNPROCESSED_ENTITY
      );

    const startHours = Math.floor(slot.start / 60);
    const startMins = slot.start % 60;
    start.setHours(startHours, startMins, 0, 0);

    const endHours = Math.floor(slot.end / 60);
    const endMins = slot.end % 60;
    end.setHours(endHours, endMins, 0, 0);

    const isBooked = await this._reviewRepository.checkIsBookedSlot(
      mentorId,
      start,
      end
    );
    if (isBooked)
      throw new CustomError(HTTP_STATUS.CONFLICT, ERROR_MESSAGE.SLOT.CONFLICT);
  }
}
