import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import { IReviewModel } from "frameworks/database/models/bookedSlot.model";



export interface IBookReviewUsecase{
    create(studentId:string,reviewDetails:Partial<IReviewEntity> & {amount:number}):Promise<IReviewModel>
    save(review:IReviewModel):Promise<void>
}