import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { IDomainModel } from "frameworks/database/models/domain.model";

import { IBaseRepository } from "./baseRepository.interface";


export interface IDomainRepository extends IBaseRepository<IDomainEntity,IDomainModel>{
    updateStatus(id:string,status:boolean):Promise<void>
}