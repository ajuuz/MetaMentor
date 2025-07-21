import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import {  IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IGetDomainInsightUsecase } from "entities/usecaseInterfaces/domain/getDomainInsightUsecase.interface";
import {  GetStudentReviewResponseDTO } from "shared/dto/reviewDTO";
import { GetNextLevelResponseDTO } from "shared/dto/levelsDTO";
import { NotFoundError } from "shared/utils/error/notFounError";
import { inject, injectable } from "tsyringe";


@injectable()
export class GetDomainInsightUsecase implements IGetDomainInsightUsecase{

    constructor(
        @inject('IDomainRepository')
        private _domainRepository:IDomainRepository,

        @inject('ILevelRepository')
        private _levelRepository:ILevelRepository,

        @inject('IReviewRepository')
        private _reviewRepository:IReviewRepository,
    ){}

    async execute(studentId:string,domainId:string):Promise<{reviews:GetStudentReviewResponseDTO[],domain:IDomainEntity,noOfLevelPassed:number,nextLevels:GetNextLevelResponseDTO[]}>{
        
        const asyncOperations=[]
        
        const domainFilter={_id:domainId};
        const domainProjection={name:true,image:true,description:true,motive:true} as any;
        asyncOperations.push(this._domainRepository.findOne(domainFilter,domainProjection))

        asyncOperations.push(this._reviewRepository.findByStudentAndDomain(studentId,domainId))
        asyncOperations.push(this._reviewRepository.getPassedReviewsCount(studentId,domainId))

        const [domain,reviews,noOfLevelPassed] = await Promise.all(asyncOperations) as [IDomainEntity|null,GetStudentReviewResponseDTO[]|null,number|null]

        if(!domain || !reviews ||(noOfLevelPassed!==0 && !noOfLevelPassed)){
            throw new NotFoundError('Domain Not found')
        }
        
        const nextLevels=await this._levelRepository.getNextLevel(domainId,noOfLevelPassed)

        return {reviews,domain,noOfLevelPassed,nextLevels}
    }
}