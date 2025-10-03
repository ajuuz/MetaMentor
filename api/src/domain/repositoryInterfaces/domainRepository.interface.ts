import { IDomainEntity } from "domain/entities/domainModel.entity";

import { IDomainModel } from "infrastructure/database/models/domain.model";
import { SORT_ORDER } from "shared/constants";

import { IBaseRepository } from "./baseRepository.interface";

export interface IDomainRepository
  extends IBaseRepository<IDomainEntity, IDomainModel> {
  findWithFilterAndPaginated(
    searchTerm: string,
    filter: Partial<IDomainEntity>,
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ items: IDomainModel[]; totalDocuments: number }>;
  updateStatus(id: string, status: boolean): Promise<void>;
}
