import { IDomainEntity } from "domain/entities/domainModel.entity";

export interface IGetEnrolledCommunitiesUsecase {
  execute(
    userId: string,
    currentPage: number,
    limit: number
  ): Promise<{
      domains: IDomainEntity[];
      totalPages: number;
    }>;
}
