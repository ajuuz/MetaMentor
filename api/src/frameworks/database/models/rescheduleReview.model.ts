import mongoose, { Document, ObjectId } from "mongoose";

import { mentorSchema } from "../schemas/mentor.schema";
import { IRescheduleReviewEntity } from "domain/entities/rescheduleReviewModel.entity";
import { rescheduleReviewSchema } from "../schemas/rescheduleReview.schema";

export interface IRescheduleReviewModel
  extends Omit<
      IRescheduleReviewEntity,
      "_id" | "studentId" | "reviewId" | "mentorId"
    >,
    Document<ObjectId> {
  studentId: ObjectId;
  reviewId: ObjectId;
  mentorId: ObjectId;
}

export const RescheduleReviewModel = mongoose.model<IRescheduleReviewModel>(
  "RescheduleReview",
  rescheduleReviewSchema
);
