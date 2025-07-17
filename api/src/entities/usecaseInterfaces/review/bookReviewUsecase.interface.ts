import { IReviewModel } from "frameworks/database/models/bookedSlot.model";
import { BookReviewDTO } from "shared/dto/reviewDTO";



export interface IBookReviewUsecase{
    create(studentId:string,reviewDetails:BookReviewDTO):Promise<IReviewModel>
    save(review:IReviewModel):Promise<void>
}