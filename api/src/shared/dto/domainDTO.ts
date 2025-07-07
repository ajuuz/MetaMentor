import { IDomainEntity } from "entities/modelEntities/domainModel.entity"
import { levelDTO } from "./levelsDTO"

export type DomainRequestDTO={
    name:string,
    image:string,
    description:string,
    motive:string,
    levels:levelDTO[]
}


export type GetAllDomainsResponseDTO={
   domains:IDomainEntity[],
   totalDocuments:number,
   totalPages:number
}
