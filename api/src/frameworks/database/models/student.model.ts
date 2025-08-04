import { IStudentEntity } from "entities/modelEntities/student-model.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { studentSchema } from "../schemas/student.schema";


export interface IStudentModel extends IStudentEntity , Document{
    _id:ObjectId
} 


export const studentModel = mongoose.model<IStudentModel>("students",studentSchema)