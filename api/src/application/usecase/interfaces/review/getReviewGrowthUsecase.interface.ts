import { TIME_PERIOD, TIME_PERIOD_GROUP_BY } from "shared/constants";

export interface IGetReviewGrowthUsecase {
  execute(
    period: TIME_PERIOD,
    timePeriodGroupBy: TIME_PERIOD_GROUP_BY,
    mentorId?: string
  ): Promise<{ name: string; revenue: number; reviewCount: number }[]>;
}
