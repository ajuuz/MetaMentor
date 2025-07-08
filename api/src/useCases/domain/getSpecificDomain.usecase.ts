import { ILevelEntity } from "entities/modelEntities/levelModel.entity";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IGetSpecificDomainUsecase } from "entities/usecaseInterfaces/domain/getSpecificDomainUsecase.interface";
import { DomainTypeDTO } from "shared/dto/domainDTO";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetSpecificDomainUsecase implements IGetSpecificDomainUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository,

        @inject('ILevelRepository')
        private _levelRepository:ILevelRepository
    ){}

   async execute(domainId:string):Promise<DomainTypeDTO>{

        const domainFilter={_id:domainId}
        const domain = await this._domainRepository.findOne(domainFilter);
        if(!domain) throw new NotFoundError('Domain not found');

        const levelFilter={domainId}
        const levels=await this._levelRepository.findWhole(levelFilter)
        
        return {...domain,levels}
   }
}