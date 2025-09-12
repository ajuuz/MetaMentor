
import { IBaseRepository } from "./baseRepository.interface";
import { IRescheduleReviewEntity } from "entities/modelEntities/rescheduleReviewModel.entity";
import { IRescheduleReviewModel } from "frameworks/database/models/rescheduleReview.model";



export interface IRescheduleReviewRepository extends IBaseRepository<IRescheduleReviewEntity,IRescheduleReviewModel>{
    
}