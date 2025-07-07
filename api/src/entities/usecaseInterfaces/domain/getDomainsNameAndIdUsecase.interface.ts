import { IDomainEntity } from "entities/modelEntities/domainModel.entity";



export interface IGetAllDomainsNameAndIdUsecase{
    execute():Promise<Pick<IDomainEntity,'_id'|'name'>[]>
}