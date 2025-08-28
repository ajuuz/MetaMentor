import { ISlotTime } from "entities/modelEntities/slotModel.entity";
import { DAYS } from "shared/constants";

export interface IGetSlotsForStudUsecase {
  execute(
    mentorId: string,
    day:DAYS
  ): Promise<ISlotTime[]>;
}
