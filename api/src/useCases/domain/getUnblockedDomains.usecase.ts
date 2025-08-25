import { plainToInstance } from "class-transformer";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IGetUnblockedDomainsUsecase } from "entities/usecaseInterfaces/domain/getUnblockedDomainsUsecase.interface";
import { GetDomainsForStudResDTO } from "shared/dto/response/domain.dto";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetUnblockedDomainsUsecase implements IGetUnblockedDomainsUsecase{
    constructor(
            @inject('IDomainRepository')
            private _domainRepository:IDomainRepository
        ){}
   async execute(currentPage:number,limit:number):Promise<{domains:GetDomainsForStudResDTO[],totalPages:number}>{
        const skip = (currentPage-1)*limit;
        const {items,totalDocuments}=await this._domainRepository.find({isBlocked:false},skip,limit,{createdAt:1})
        const domains = plainToInstance(GetDomainsForStudResDTO,items,{
          excludeExtraneousValues:true
        })
        const totalPages = Math.ceil(totalDocuments/limit);
        return {domains,totalPages}
   }
}