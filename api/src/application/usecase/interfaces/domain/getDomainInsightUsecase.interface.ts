import { GetDomainResDTO } from "shared/dto/response/domain.dto";
import { LevelResDTO } from "shared/dto/response/level.dto";
import { GetReviewsForStudAndDomainResDTO } from "shared/dto/response/review.dto";

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
