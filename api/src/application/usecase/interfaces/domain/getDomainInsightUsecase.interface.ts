import { GetDomainResDTO } from "application/dto/response/domain.dto";
import { LevelResDTO } from "application/dto/response/level.dto";
import { GetReviewsForStudAndDomainResDTO } from "application/dto/response/review.dto";

export interface IGetDomainInsightUsecase {
  execute(
    studentId: string,
    domainId: string
  ): Promise<{
    reviews: GetReviewsForStudAndDomainResDTO[];
    domain: GetDomainResDTO;
    noOfLevelPassed: number;
    nextLevels: LevelResDTO[];
  }>;
}
