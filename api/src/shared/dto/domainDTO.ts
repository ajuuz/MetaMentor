import { IDomainEntity } from "entities/modelEntities/domainModel.entity"
import { ILevelEntity } from "entities/modelEntities/levelModel.entity"

export type DomainRequestDTO={
    name:string,
    image:string,
    description:string,
    motive:string,
    levels:Omit<ILevelEntity,'_id'>[]
}

export type DomainTypeDTO = IDomainEntity & {levels:ILevelEntity[]}


export type GetAllDomainsResponseDTO={
   domains:IDomainEntity[],
   totalDocuments:number,
   totalPages:number
}


