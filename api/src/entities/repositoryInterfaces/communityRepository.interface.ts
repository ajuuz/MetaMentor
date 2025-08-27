import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { ICommunityModel } from "frameworks/database/models/community.model";

import { IBaseRepository } from "./baseRepository.interface";
import { SORT_ORDER } from "shared/constants";

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
