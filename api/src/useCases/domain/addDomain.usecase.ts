import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import { ICreateLevelEntity } from "entities/modelEntities/levelModel.entity";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { CreateDomainReqDTO } from "shared/dto/request/domain.dto";
import { inject, injectable } from "tsyringe";


type CreateCommunity=Omit<ICommunityEntity,'_id'|'isBlocked'>
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

    async execute(domainDetails:CreateDomainReqDTO):Promise<void>{
        const {levels,...rest} = domainDetails;

            const domain = this._domainRepository.create(rest)
            const domainId = domain._id.toString()
            const mappedLevels:ICreateLevelEntity[]=levels.map((level)=>(
                {domainId,
                 name:level.name,
                 description:level.description,
                 taskFile:level.taskFile,
                 tasks:level.tasks.map(task=>({
                    type:task.type,
                    content:task.content,
                    isCompleted:false
                 }))
                }
            ))
           
            const asyncOperations=[];
            asyncOperations.push(this._domainRepository.save(domain))
            asyncOperations.push(this._levelRepository.inserManyLevels(mappedLevels))

            const communityDetails:CreateCommunity={communityId:domainId,name:domain.name}
            asyncOperations.push(this._communityRepository.insertOne(communityDetails))

            await Promise.all(asyncOperations);
    }
}