import { plainToInstance } from "class-transformer";
import { IDomainEntity } from "domain/entities/domainModel.entity";
import { IGetReviewsForStudAndDomain } from "domain/entities/reviewModel.entity";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { IEnrolledLevelRepository } from "domain/repositoryInterfaces/enrolledLevelRepository.interface";
import { ILevelRepository } from "domain/repositoryInterfaces/levelRepository.interface";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { IGetDomainInsightUsecase } from "entities/usecaseInterfaces/domain/getDomainInsightUsecase.interface";
import { GetDomainResDTO } from "shared/dto/response/domain.dto";
import { EnrolledLevelResDTO } from "shared/dto/response/enrolledLevel.dto";
import { GetReviewsForStudAndDomainResDTO } from "shared/dto/response/review.dto";
import { NotFoundError } from "domain/errors/notFounError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetDomainInsightUsecase implements IGetDomainInsightUsecase {
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository,

    @inject("ILevelRepository")
    private _levelRepository: ILevelRepository,

    @inject("IEnrolledLevelRepository")
    private _enrolledLevelRepository: IEnrolledLevelRepository,

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
    nextLevels: EnrolledLevelResDTO[];
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
      IGetReviewsForStudAndDomain[] | null,
      number | null
    ];

    if (!reviewsData || !domainData) {
      throw new NotFoundError("Domain Not found");
    }
    const domain = plainToInstance(GetDomainResDTO, domainData, {
      excludeExtraneousValues: true,
    });

    const reviews = plainToInstance(
      GetReviewsForStudAndDomainResDTO,
      reviewsData,
      {
        excludeExtraneousValues: true,
      }
    );

    if (noOfLevelPassed !== 0 && !noOfLevelPassed) {
      throw new NotFoundError("Domain Not found");
    }

    const nextLevelsData = await this._enrolledLevelRepository.getNextLevels(
      studentId,
      domainId,
      noOfLevelPassed
    );

    const nextLevels = plainToInstance(EnrolledLevelResDTO, nextLevelsData, {
      excludeExtraneousValues: true,
    });

    return { reviews, domain, noOfLevelPassed, nextLevels };
  }
}
