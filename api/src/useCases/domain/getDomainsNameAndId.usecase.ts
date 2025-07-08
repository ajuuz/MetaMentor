import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IGetAllDomainsNameAndIdUsecase } from "entities/usecaseInterfaces/domain/getDomainsNameAndIdUsecase.interface";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetAllDomainsNameAndIdUsecase implements IGetAllDomainsNameAndIdUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository
    ){}

    async execute():Promise<Pick<IDomainEntity,'_id'|'name'>[]>{
        const filter={}
        const projection={name:true}
        const domains=await this._domainRepository.findWhole(filter,projection) as Pick<IDomainEntity,'_id'|'name'>[]
        return domains;
    }
}