import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { BaseRepository } from "interfaceAdapters/repositories/base.repository";
import { REVIEW_STATUS } from "shared/constants";
import { BookReviewDTO, GetDomainReviewResponseDTO, GetStudentReviewResponseDTO } from "shared/dto/reviewDTO";


export interface IReviewRepository extends BaseRepository<IReviewEntity,IReviewModel>{
    
    findByStudentAndDomain(studentId:string,domainId:string):Promise<GetDomainReviewResponseDTO[]>
    getPassedReviewsCount(studentId:string,domainId:string):Promise<number>
    findByStudentId(studentId:string,status:REVIEW_STATUS[]):Promise<GetStudentReviewResponseDTO[]>
    createReview(reviewDetails:Omit<BookReviewDTO,'amount'>):Promise<IReviewModel>
    saveReview(review:IReviewModel):Promise<void>
    checkIsBookedSlot(mentorId:string,day:string,start:number,end:number):Promise<boolean>
}