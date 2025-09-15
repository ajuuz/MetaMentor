import { plainToInstance } from "class-transformer";
import { ICommunityRepository } from "domain/repositoryInterfaces/communityRepository.interface";
import { IGetCommunitiesUsecase } from "entities/usecaseInterfaces/community/getCommunitiesUsecase.interface";
import { SORT_ORDER } from "shared/constants";
import { GetCommunitiesForAdminResDTO } from "shared/dto/response/community.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetCommunitiesUsecase implements IGetCommunitiesUsecase {
  constructor(
    @inject("ICommunityRepository")
    private _communityRepository: ICommunityRepository
  ) {}

  async execute(
    currentPage: number,
    limit: number,
    sortBy: string,
    searchTerm: string
  ): Promise<{
    communities: GetCommunitiesForAdminResDTO[];
    totalPages: number;
  }> {
    const filter: Record<string, string | string[]> = {};
    const skip: number = (currentPage - 1) * limit;

    //filter
    filter.searchTerm = searchTerm;
    //sort
    const [field, order] = sortBy!.split("-");
    const sort = { field, order: order as SORT_ORDER };

    const { items, totalDocuments } =
      await this._communityRepository.findWithFilterAndPaginated(
        filter,
        skip,
        limit,
        sort
      );

    const communities = plainToInstance(GetCommunitiesForAdminResDTO, items, {
      excludeExtraneousValues: true,
    });
    const totalPages = Math.ceil(totalDocuments / limit);
    return { communities, totalPages };
  }
}
