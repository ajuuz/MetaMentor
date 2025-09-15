import { GetDomainsForAdminResDTO } from "shared/dto/response/domain.dto";

export interface IGetAllDomainsUsecase {
  execute(
    currentPage: number,
    limit: number,
    sortBy: string,
    searchTerm: string
  ): Promise<{ domains: GetDomainsForAdminResDTO[]; totalPages: number }>;
}
