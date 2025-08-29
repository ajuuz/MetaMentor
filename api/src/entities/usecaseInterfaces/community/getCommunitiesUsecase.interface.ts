import { GetCommunitiesForAdminResDTO } from "shared/dto/response/community.dto";

export interface IGetCommunitiesUsecase {
  execute(
    currentPage: number,
    limit: number,
    sortBy: string,
    searchTerm: string
  ): Promise<{
    communities: GetCommunitiesForAdminResDTO[];
    totalPages: number;
  }>;
}
