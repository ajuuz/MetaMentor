import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IGetUnblockedDomainsUsecase } from "entities/usecaseInterfaces/domain/getUnblockedDomainsUsecase.interface";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetUnblockedDomainsUsecase implements IGetUnblockedDomainsUsecase{
    constructor(
            @inject('IDomainRepository')
            private _domainRepository:IDomainRepository
        ){}
   async execute(currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>{
        const skip = (currentPage-1)*limit;
        const {items:domains,totalDocuments}=await this._domainRepository.find({isBlocked:false},skip,limit,{createdAt:1})
        const totalPages = Math.ceil(totalDocuments/limit);
        return {domains,totalPages}
   }
}