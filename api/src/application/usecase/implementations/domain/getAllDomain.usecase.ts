import { plainToInstance } from "class-transformer";
import { IDomainEntity } from "domain/entities/domainModel.entity";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { IGetAllDomainsUsecase } from "application/usecase/interfaces/domain/getDomainUsecase.interface";
import { SORT_ORDER } from "shared/constants";
import { GetDomainsForAdminResDTO } from "application/dto/response/domain.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllDomainsUsecase implements IGetAllDomainsUsecase {
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository
  ) {}

  async execute(
    currentPage: number,
    limit: number,
    sortBy: string,
    searchTerm: string
  ): Promise<{ domains: GetDomainsForAdminResDTO[]; totalPages: number }> {
    //filter
    const filter: Partial<IDomainEntity> = {};
    const skip = (currentPage - 1) * limit;

    //sort
    const splittedSortBy = sortBy.split("-");
    const sortingField = splittedSortBy[0];
    const sortingOrder = splittedSortBy[1] as SORT_ORDER;
    const sort = { field: sortingField, order: sortingOrder };

    const { items, totalDocuments } =
      await this._domainRepository.findWithFilterAndPaginated(
        searchTerm,
        filter,
        skip,
        limit,
        sort
      );

    const domains = plainToInstance(GetDomainsForAdminResDTO, items, {
      excludeExtraneousValues: true,
    });

    const totalPages = Math.ceil(totalDocuments / limit);
    return { domains, totalPages };
  }
}
