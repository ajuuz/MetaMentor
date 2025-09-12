import { IRescheduleReviewEntity } from "entities/modelEntities/rescheduleReviewModel.entity";


export interface IGetRescheduledReviewUsecase{
    execute(reviewId:string):Promise<IRescheduleReviewEntity>
}