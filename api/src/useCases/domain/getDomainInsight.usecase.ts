import { plainToInstance } from "class-transformer";
import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IGetDomainInsightUsecase } from "entities/usecaseInterfaces/domain/getDomainInsightUsecase.interface";
import { GetDomainResDTO } from "shared/dto/response/domain.dto";
import { LevelResDTO } from "shared/dto/response/level.dto";
import { GetReviewsForStudAndDomainResDTO } from "shared/dto/response/review.dto";
import { GetStudentReviewResponseDTO } from "shared/dto/reviewDTO";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetDomainInsightUsecase implements IGetDomainInsightUsecase {
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository,

    @inject("ILevelRepository")
    private _levelRepository: ILevelRepository,

    @inject("IReviewRepository")
    private _reviewRepository: IReviewRepository
  ) {}

  async execute(
    studentId: string,
    domainId: string
  ): Promise<{
    reviews: GetReviewsForStudAndDomainResDTO[];
    domain: GetDomainResDTO;
    noOfLevelPassed: number;
    nextLevels: LevelResDTO[];
  }> {
    const asyncOperations = [];

    const domainFilter = { _id: domainId };
    const domainProjection = {};
    asyncOperations.push(
      this._domainRepository.findOne(domainFilter, domainProjection)
    );

    asyncOperations.push(
      this._reviewRepository.findByStudentAndDomain(studentId, domainId)
    );
    asyncOperations.push(
      this._reviewRepository.getPassedReviewsCount(studentId, domainId)
    );

    const [domainData, reviewsData, noOfLevelPassed] = (await Promise.all(
      asyncOperations
    )) as [
      IDomainEntity | null,
      GetStudentReviewResponseDTO[] | null,
      number | null
    ];

    if (!reviewsData || !domainData) {
      throw new NotFoundError("Domain Not found");
    }
    const domain = plainToInstance(GetDomainResDTO, domainData, {
      excludeExtraneousValues: true,
    });

    const reviews = plainToInstance(GetReviewsForStudAndDomainResDTO, reviewsData, {
      excludeExtraneousValues: true,
    });

    if (noOfLevelPassed !== 0 && !noOfLevelPassed) {
      throw new NotFoundError("Domain Not found");
    }

    const nextLevelsData = await this._levelRepository.getNextLevel(
      domainId,
      noOfLevelPassed
    );

    const nextLevels = plainToInstance(LevelResDTO, nextLevelsData, {
      excludeExtraneousValues: true,
    });

    return { reviews, domain, noOfLevelPassed, nextLevels };
  }
}
