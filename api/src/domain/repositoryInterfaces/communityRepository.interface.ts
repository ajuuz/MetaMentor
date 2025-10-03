import { ICommunityEntity } from "domain/entities/communityModel.entity";

import { ICommunityModel } from "infrastructure/database/models/community.model";
import { SORT_ORDER } from "shared/constants";

import { IBaseRepository } from "./baseRepository.interface";

export interface ICommunityRepository
  extends IBaseRepository<ICommunityEntity, ICommunityModel> {
  updateStatus(communityId: string, status: boolean): Promise<void>;
  findWithFilterAndPaginated(
    filter: Record<string, string | string[]>,
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ items: ICommunityEntity[]; totalDocuments: number }>;
}
