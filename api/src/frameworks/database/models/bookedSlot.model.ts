import { IReviewEntity } from "entities/modelEntities/reviewModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { reviewSchema } from "../schemas/review.schema";

export interface IReviewModel
  extends Omit<IReviewEntity, "_id"|'studentId'|"mentorId"|'domainId'|'levelId'>,
    Document<ObjectId> {
  studentId: ObjectId;
  mentorId: ObjectId;
  domainId: ObjectId;
  levelId: ObjectId;
}

export const reviewModel = mongoose.model<IReviewModel>(
  "reviews",
  reviewSchema
);
