import { domainModel, IDomainModel } from "frameworks/database/models/domain.model";
import { BaseRepository } from "./base.repository";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IDomainEntity } from "entities/modelEntities/domainModel.entity";



export class DomainRepository extends BaseRepository<IDomainEntity,IDomainModel> implements IDomainRepository{
    constructor(){
        super(domainModel)
    }
}