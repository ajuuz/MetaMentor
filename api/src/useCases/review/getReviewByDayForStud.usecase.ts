import { IGetBookedSlotsForStud } from "domain/entities/reviewModel.entity";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IGetReviewByDayForStudUsecase } from "entities/usecaseInterfaces/review/getReviewByDayForStudUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReviewByDayForStudUsecase
  implements IGetReviewByDayForStudUsecase
{
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(
    mentorId: string,
    date: string
  ): Promise<IGetBookedSlotsForStud[]> {
    const newDate = new Date(date);

    const startOfDay = new Date(newDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(newDate);
    endOfDay.setHours(23, 59, 59, 999);
    const reviews = await this._reviewRepository.findByMentorAndDay(
      mentorId,
      startOfDay,
      endOfDay
    );
    return reviews;
  }
}
