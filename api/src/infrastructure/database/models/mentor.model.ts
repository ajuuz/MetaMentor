import { IMentorEntity } from "domain/entities/mentor-model.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { mentorSchema } from "../schemas/mentor.schema";

export interface IMentorModel
  extends Omit<IMentorEntity, "_id" | "userId" | "domains">,
    Document<ObjectId> {
  userId: ObjectId;
  domains: ObjectId[];
}

export const mentorModel = mongoose.model<IMentorModel>(
  "mentors",
  mentorSchema
);
