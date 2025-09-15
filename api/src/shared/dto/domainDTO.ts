import { IDomainEntity } from "domain/entities/domainModel.entity";

export type GetAllDomainsResponseDTO = {
  domains: IDomainEntity[];
  totalDocuments: number;
  totalPages: number;
};
