import { IGetBookedSlotsForStud } from "entities/modelEntities/reviewModel.entity";

export interface IGetReviewByDayForStudUsecase {
  execute(mentorId: string, date:string): Promise<IGetBookedSlotsForStud[]>;
}
