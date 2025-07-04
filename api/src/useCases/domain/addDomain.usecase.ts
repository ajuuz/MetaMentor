import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { IInsertManyLevelUsecase } from "entities/usecaseInterfaces/level/insertManyLevelUsecase.interface";
import { DomainRequestDTO } from "shared/dto/domainDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class AddDomainUsecase implements IAddDomainUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository,

        @inject('IInsertManyLevelUsecase')
        private _insertManyLevelUsecase:IInsertManyLevelUsecase
    ){}

    async execute(domainDetails:DomainRequestDTO):Promise<void>{
        const {levels,...rest} = domainDetails;
        const domain = this._domainRepository.create(rest)

        for(let i=0;i<levels.length;i++){
            levels[i].domainId=domain._id
        }

        const asyncOperations=[];
        asyncOperations.push(this._domainRepository.save(domain))
        asyncOperations.push(this._insertManyLevelUsecase.execute(levels))
        await Promise.all(asyncOperations);
    }
}