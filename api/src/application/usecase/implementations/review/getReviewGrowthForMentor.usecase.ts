import { IGetReviewGrowthForMentorUsecase } from "application/usecase/interfaces/review/getReviewGrowthForMentorUsecase.interface";
import { IGetReviewGrowthUsecase } from "application/usecase/interfaces/review/getReviewGrowthUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetReviewGrowthForMentorUsecase
  implements IGetReviewGrowthForMentorUsecase
{
  constructor(
    @inject("IGetReviewGrowthUsecase")
    private _getReviewGrowthUsecase: IGetReviewGrowthUsecase
  ) {}
  async execute(mentorId: string): Promise<void> {
    const filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[] = [];

    filters.push({ field: "mentorId", value: mentorId, type: "complex" });
  }
}
