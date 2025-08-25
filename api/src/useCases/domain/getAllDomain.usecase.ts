import { plainToInstance } from "class-transformer";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { GetDomainsForAdminResDTO } from "shared/dto/response/domain.dto";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllDomainsUsecase implements IGetAllDomainsUsecase {
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository
  ) {}

  async execute(
    currentPage: number,
    limit: number
  ): Promise<{ domains: GetDomainsForAdminResDTO[]; totalPages: number }> {
    if (!currentPage || !limit)
      throw new ValidationError("Required fields are not recieved");
    const skip = (currentPage - 1) * limit;
    const { items, totalDocuments } = await this._domainRepository.find(
      {},
      skip,
      limit,
      { createdAt: 1 }
    );

    const domains = plainToInstance(GetDomainsForAdminResDTO, items, {
      excludeExtraneousValues: true,
    });

    const totalPages = Math.ceil(totalDocuments / limit);
    return { domains, totalPages };
  }
}
