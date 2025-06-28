import mongoose, { Document, ObjectId } from "mongoose";
import { IMentorEntity } from "entities/modelEntities/mentor-model.entity";
import { mentorSchema } from "../schemas/mentor.schema";

export interface IMentorModel extends IMentorEntity , Document{
    _id:ObjectId
} 


export const mentorDB = mongoose.model<IMentorModel>("mentors",mentorSchema)