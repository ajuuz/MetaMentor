import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import { GetReviewResponseDTO } from "shared/dto/reviewDTO";
import { GetNextLevelResponseDTO } from "shared/dto/levelsDTO";



export interface IGetDomainInsightUsecase{
    execute(studentId:string,domainId:string):Promise<{reviews:GetReviewResponseDTO[],domain:IDomainEntity,noOfLevelPassed:number,nextLevels:GetNextLevelResponseDTO[]}>
}