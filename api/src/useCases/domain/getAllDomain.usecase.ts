import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { ROLES } from "shared/constants";
import { GetAllDomainsResponseDTO } from "shared/dto/domainDTO";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllDomainsUsecase implements IGetAllDomainsUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository
    ){}

    private async _getAllDomains(skip:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalPages'>>{
        const {items,totalDocuments}=await this._domainRepository.find({},skip,limit,{createdAt:1})
        return {domains:items,totalDocuments}
    }

    private async _getUnblockedDomains(skip:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalPages'>>{
        const {items,totalDocuments}=await this._domainRepository.find({isBlocked:false},skip,limit,{createdAt:1})
        return {domains:items,totalDocuments}
    }

    async execute(role:ROLES,currentPage:number,limit:number):Promise<Omit<GetAllDomainsResponseDTO,'totalDocuments'>>{
        if(!role || !currentPage || !limit) throw new ValidationError('Required fields are not recieved');
        
        const usecase={
            admin:this._getAllDomains.bind(this),
            user:this._getUnblockedDomains.bind(this),
            mentor:this._getUnblockedDomains.bind(this)
        }[role]
        const skip = (currentPage-1)*limit;
        const {domains,totalDocuments} =await usecase(skip,limit);
        const totalPages = Math.ceil(totalDocuments/limit);
        return {domains,totalPages}
    }
}