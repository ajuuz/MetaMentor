import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { IDomainModel } from "frameworks/database/models/domain.model";

import { IBaseRepository } from "./baseRepository.interface";
import { SORT_ORDER } from "shared/constants";

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
