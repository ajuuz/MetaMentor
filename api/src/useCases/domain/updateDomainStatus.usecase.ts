import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IUpdateDomainStatusUsecase } from "entities/usecaseInterfaces/domain/updateDomainStatusUsecase.interface";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateDomainStatusUsecase implements IUpdateDomainStatusUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository,


    ){}
    async execute(domainId:string,status:boolean):Promise<void>{
        if(!domainId || (status!==false && !status)) throw new ValidationError('Required fields are not recieved');
        await this._domainRepository.updateStatus(domainId,status);
    }
}