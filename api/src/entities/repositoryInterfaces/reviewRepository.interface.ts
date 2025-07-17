import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { BaseRepository } from "interfaceAdapters/repositories/base.repository";
import { BookReviewDTO, GetReviewResponseDTO } from "shared/dto/reviewDTO";


export interface IReviewRepository extends BaseRepository<IReviewEntity,IReviewModel>{
    
    findByStudentAndDomain(studentId:string,domainId:string):Promise<GetReviewResponseDTO[]>
    getPassedReviewsCount(studentId:string,domainId:string):Promise<number>
    createReview(reviewDetails:Omit<BookReviewDTO,'amount'>):Promise<IReviewModel>
    saveReview(review:IReviewModel):Promise<void>
    checkIsBookedSlot(mentorId:string,day:string,start:number,end:number):Promise<boolean>
}