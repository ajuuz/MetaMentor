import { ISlotTime } from "domain/entities/slotModel.entity";

import { DAYS } from "shared/constants";

export interface IGetSlotsForStudUsecase {
  execute(mentorId: string, day: DAYS): Promise<ISlotTime[]>;
}
