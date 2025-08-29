import { IDomainEntity } from "entities/modelEntities/domainModel.entity"

export type GetAllDomainsResponseDTO={
   domains:IDomainEntity[],
   totalDocuments:number,
   totalPages:number
}



