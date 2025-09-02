import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { BookReviewReqDTO } from "shared/dto/request/payment.dto";

type ReviewDetails=Omit<IReviewEntity,''>

export interface IBookReviewUsecase{
    create(studentId:string,reviewDetails:BookReviewReqDTO):Promise<IReviewModel>
    save(review:IReviewModel):Promise<void>
}