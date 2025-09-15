import { IGetBookedSlotsForStud } from "domain/entities/reviewModel.entity";

export interface IGetReviewByDayForStudUsecase {
  execute(mentorId: string, date: string): Promise<IGetBookedSlotsForStud[]>;
}
