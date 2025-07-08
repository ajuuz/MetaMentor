import { IDomainEntity } from "entities/modelEntities/domainModel.entity";

export interface IGetEnrolledDomainsUsecase{

    execute(userId:string):Promise<IDomainEntity[]>
}