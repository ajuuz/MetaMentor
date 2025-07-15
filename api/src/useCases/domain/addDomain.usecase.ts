import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { DomainRequestDTO } from "shared/dto/domainDTO";
import { inject, injectable } from "tsyringe";


@injectable()
export class AddDomainUsecase implements IAddDomainUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository,

        @inject('ILevelRepository')
        private _levelRepository:ILevelRepository,

        @inject('ICommunityRepository')
        private _communityRepository:ICommunityRepository
    ){}

    async execute(domainDetails:DomainRequestDTO):Promise<void>{
        const {levels,...rest} = domainDetails;

            const domain = this._domainRepository.create(rest)
            const domainId = domain._id
            for(let i=0;i<levels.length;i++){
                levels[i].domainId=domainId
            }
            
            const asyncOperations=[];
            asyncOperations.push(this._domainRepository.save(domain))
            asyncOperations.push(this._levelRepository.insertMany(levels))

            const communityDetails:Omit<ICommunityEntity,'_id'|'isBlocked'>={communityId:domainId,name:domain.name}
            asyncOperations.push(this._communityRepository.insertOne(communityDetails))

            await Promise.all(asyncOperations);
    }
}