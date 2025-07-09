import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";

export interface IGetEnrolledDomainsUsecase{

    execute(userId:string,currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>
}