import { IDomainEntity } from "domain/entities/domainModel.entity";

export interface IGetAllDomainsNameAndIdUsecase {
  execute(): Promise<Pick<IDomainEntity, "_id" | "name">[]>;
}
