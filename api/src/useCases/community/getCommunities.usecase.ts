import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { IGetCommunitiesUsecase } from "entities/usecaseInterfaces/community/getCommunitiesUsecase.interface";
import { SORT_ORDER } from "shared/constants";
import { GetAllCommunitiesResponseDTO } from "shared/dto/communityDTO";
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
  ): Promise<Omit<GetAllCommunitiesResponseDTO, "totalDocuments">> {
    const filter: Record<string, string | string[]> = {};
    const skip: number = (currentPage - 1) * limit;

    //filter
    filter.searchTerm = searchTerm;
    //sort
    const [field, order] = sortBy!.split("-");
    const sort = { field, order: order as SORT_ORDER };

    const { items: communities, totalDocuments } =
      await this._communityRepository.findWithFilterAndPaginated(
        filter,
        skip,
        limit,
        sort
      );
    const totalPages = Math.ceil(totalDocuments / limit);
    return { communities, totalPages };
  }
}
