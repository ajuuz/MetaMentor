import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { GetNextLevelResponseDTO } from "shared/dto/levelsDTO";
import { GetReviewResponseDTO } from "shared/dto/reviewDTO";



export interface IGetDomainInsightUsecase{
    execute(studentId:string,domainId:string):Promise<{reviews:GetReviewResponseDTO[],domain:IDomainEntity,noOfLevelPassed:number,nextLevels:GetNextLevelResponseDTO[]}>
}