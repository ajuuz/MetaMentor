import { IDomainModel } from "frameworks/database/models/domain.model";
import { IBaseRepository } from "./baseRepository.interface";
import { IDomainEntity } from "entities/modelEntities/domainModel.entity";


export interface IDomainRepository extends IBaseRepository<IDomainEntity,IDomainModel>{
    updateStatus(id:string,status:boolean):Promise<void>
}