import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";
import { reviewSchema } from "../schemas/review.schema";


export interface IReviewModel extends Omit<IReviewEntity,'_id'>,Document{
    _id:ObjectId
}


export const reviewModel = mongoose.model<IReviewModel>('reviews',reviewSchema)