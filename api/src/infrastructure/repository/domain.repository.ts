import { IDomainEntity } from "domain/entities/domainModel.entity";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import {
  domainModel,
  IDomainModel,
} from "infrastructure/database/models/domain.model";

import { BaseRepository } from "./base.repository";
import { SORT_ORDER } from "shared/constants";
import { FilterQuery, SortOrder } from "mongoose";

export class DomainRepository
  extends BaseRepository<IDomainEntity, IDomainModel>
  implements IDomainRepository
{
  constructor() {
    super(domainModel);
  }

  async findWithFilterAndPaginated(
    searchTerm: string,
    filter: Partial<IDomainEntity> = {},
    skip: number = 0,
    limit: number = 10,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ items: IDomainModel[]; totalDocuments: number }> {
    const mongoFilter = filter as unknown as FilterQuery<IDomainModel>;

    if (searchTerm) {
      mongoFilter["name"] = { $regex: searchTerm, $options: "i" };
    }

    const sortOption = sort
      ? ({ [sort.field]: sort.order === "asc" ? 1 : -1 } as Record<
          string,
          SortOrder
        >)
      : {};

    const [items, totalDocuments] = await Promise.all([
      domainModel
        .find(mongoFilter)
        .skip(skip)
        .sort(sortOption)
        .limit(limit)
        .lean(),
      domainModel.countDocuments(mongoFilter),
    ]);
    return { items, totalDocuments };
  }

  async updateStatus(id: string, status: boolean): Promise<void> {
    await this.model.updateOne({ _id: id }, { isBlocked: status });
  }
}
