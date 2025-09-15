import { IDomainEntity } from "domain/entities/domainModel.entity";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IGetAllDomainsNameAndIdUsecase } from "entities/usecaseInterfaces/domain/getDomainsNameAndIdUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllDomainsNameAndIdUsecase
  implements IGetAllDomainsNameAndIdUsecase
{
  constructor(
    @inject("IDomainRepository")
    private _domainRepository: IDomainRepository
  ) {}

  async execute(): Promise<Pick<IDomainEntity, "_id" | "name" | "image">[]> {
    const filter = {};
    const projection: Record<string, 1 | 0> = { name: 1, image: 1 };
    const domains = (await this._domainRepository.findWhole(
      filter,
      projection
    )) as Pick<IDomainEntity, "_id" | "name" | "image">[];
    return domains;
  }
}
