import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { BaseRepository } from "interfaceAdapters/repositories/base.repository";
import { GetReviewResponseDTO } from "shared/dto/reviewDTO";


export interface IReviewRepository extends BaseRepository<IReviewEntity,IReviewModel>{
    
    findByStudentAndDomain(studentId:string,domainId:string):Promise<GetReviewResponseDTO[]>
    getPassedReviewsCount(studentId:string,domainId:string):Promise<number>
}