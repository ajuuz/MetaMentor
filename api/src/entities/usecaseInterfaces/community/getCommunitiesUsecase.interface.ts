import { GetAllCommunitiesResponseDTO } from "shared/dto/communityDTO";

export interface IGetCommunitiesUsecase {
  execute(
    currentPage: number,
    limit: number,
    sortBy:string,
    searchTerm:string
  ): Promise<Omit<GetAllCommunitiesResponseDTO, "totalDocuments">>;
}
