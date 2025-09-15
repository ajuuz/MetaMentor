import { GetEnrolledDomainsResDTO } from "shared/dto/response/domain.dto";

export interface IGetEnrolledDomainsUsecase {
  execute(
    userId: string,
    currentPage: number,
    limit: number
  ): Promise<{ domains: GetEnrolledDomainsResDTO[]; totalPages: number }>;
}
