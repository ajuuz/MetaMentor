import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllDomainsUsecase implements IGetAllDomainsUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository
    ){}

    async execute(currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>{
        if(!currentPage || !limit) throw new ValidationError('Required fields are not recieved');
        const skip = (currentPage-1)*limit;
        const {items:domains,totalDocuments} =await this._domainRepository.find({},skip,limit,{createdAt:1})
        const totalPages = Math.ceil(totalDocuments/limit);
        return {domains,totalPages}
    }
}