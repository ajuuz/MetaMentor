import { IEnrolledLevelEntity } from "domain/entities/enrolledLevelModel";

import mongoose, { Document, ObjectId } from "mongoose";

import { enrolledLevelSchema } from "../schemas/enrolledLevel.schema";

export interface IEnrolledLevelModel
  extends Omit<
      IEnrolledLevelEntity,
      "_id" | "studentId" | "domainId" | "levelId"
    >,
    Document<ObjectId> {
  studentId: ObjectId;
  domainId: ObjectId;
  levelId: ObjectId;
}

export const EnrolledLevelModel = mongoose.model<IEnrolledLevelModel>(
  "EnrolledLevel",
  enrolledLevelSchema
);
