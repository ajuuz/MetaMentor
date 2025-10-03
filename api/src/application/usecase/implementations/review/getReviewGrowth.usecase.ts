import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";

import { IGetReviewGrowthUsecase } from "application/usecase/interfaces/review/getReviewGrowthUsecase.interface";
import { endOfDay, startOfDay, subDays, subMonths, subYears } from "date-fns";
import { ROLES, TIME_PERIOD, TIME_PERIOD_GROUP_BY } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReviewGrowthUsecase implements IGetReviewGrowthUsecase {
  constructor(
    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  private _getDateRage(period: TIME_PERIOD) {
    const now = new Date();
    const end = endOfDay(now);
    let start: Date;
    switch (period) {
      case TIME_PERIOD.TODAY:
        start = startOfDay(now);
        break;
      case TIME_PERIOD["7DAYS"]:
        start = startOfDay(subDays(now, 7));
        break;
      case TIME_PERIOD.MONTH:
        start = startOfDay(subMonths(now, 1));
        break;
      case TIME_PERIOD["3MONTHS"]:
        start = startOfDay(subMonths(now, 3));
        break;
      case TIME_PERIOD.YEAR:
        start = startOfDay(subYears(now, 1));
        break;
      default:
        start = startOfDay(now);
    }

    return { start, end };
  }

  async execute(
    period: TIME_PERIOD,
    timePeriodGroupBy: TIME_PERIOD_GROUP_BY,
    mentorId?: string
  ): Promise<{ name: string; revenue: number; reviewCount: number }[]> {
    const filters: {
      field: string;
      value: string | boolean | Date;
      type: "direct" | "complex";
    }[] = [];

    let role: Exclude<ROLES, ROLES.USER> = ROLES.ADMIN;
    if (mentorId) {
      filters.push({ field: "mentorId", value: mentorId, type: "complex" });
      role = ROLES.MENTOR;
    }

    const { start, end } = this._getDateRage(period);
    if (period !== TIME_PERIOD.ALL) {
      filters.push({ field: "startDate", value: start, type: "complex" });
      filters.push({ field: "endDate", value: end, type: "complex" });
    }

    const data = await this._reviewRepository.getReviewGrowth(
      filters,
      timePeriodGroupBy,
      role
    );

    return data;
  }
}
