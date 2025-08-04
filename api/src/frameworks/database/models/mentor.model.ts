import { IMentorEntity } from "entities/modelEntities/mentor-model.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { mentorSchema } from "../schemas/mentor.schema";

export interface IMentorModel extends IMentorEntity , Document{
    _id:ObjectId
} 


export const mentorModel = mongoose.model<IMentorModel>("mentors",mentorSchema)