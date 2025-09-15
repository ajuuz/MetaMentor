import { ICommunityEntity } from "domain/entities/communityModel.entity";
import { ICommunityRepository } from "domain/repositoryInterfaces/communityRepository.interface";
import {
  communityModel,
  ICommunityModel,
} from "infrastructure/database/models/community.model";

import { BaseRepository } from "./base.repository";
import { SORT_ORDER } from "shared/constants";
import { FilterQuery } from "mongoose";

export class CommunityRepository
  extends BaseRepository<ICommunityEntity, ICommunityModel>
  implements ICommunityRepository
{
  constructor() {
    super(communityModel);
  }

  async updateStatus(communityId: string, status: boolean): Promise<void> {
    await this.model.updateOne({ communityId }, { isBlocked: status });
  }

  async findWithFilterAndPaginated(
    filter: Record<string, string | string[]>,
    skip: number = 0,
    limit: number = 10,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ items: ICommunityEntity[]; totalDocuments: number }> {
    const mongoFilter = {} as FilterQuery<ICommunityModel>;

    if (filter.enrolledCommunities) {
      mongoFilter["communityId"] = { $in: filter.enrolledCommunities };
    }

    if (filter.searchTerm) {
      mongoFilter["domain.name"] = { $regex: filter.searchTerm, $options: "i" };
    }

    let sortOption: Record<string, 1 | -1> = {};
    if (sort.field === "name") {
      sortOption["domain.name"] = sort.order === SORT_ORDER.ASC ? 1 : -1;
    } else {
      sortOption["domain.createdAt"] = sort.order === SORT_ORDER.ASC ? 1 : -1;
    }

    const lookupPipeline = {
      $lookup: {
        from: "domains",
        foreignField: "_id",
        localField: "communityId",
        as: "domain",
      },
    };

    const data = await communityModel.aggregate([
      lookupPipeline,
      { $unwind: "$domain" },
      { $match: mongoFilter },
      {
        $facet: {
          items: [
            { $sort: sortOption },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                communityId: 1,
                name: 1,
                isBlocked: 1,
                image: "$domain.image",
              },
            },
          ],
          totalDocuments: [{ $count: "count" }, { $unwind: "$count" }],
        },
      },
      {
        $addFields: {
          totalDocuments: { $arrayElemAt: ["$totalDocuments.count", 0] },
        },
      },
    ]);
    const { items, totalDocuments } = data[0];
    console.log(items);
    return { items, totalDocuments };
  }
}
