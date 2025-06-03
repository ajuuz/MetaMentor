import { IStudentEntity } from "entities/modelEntities/student-model.entity";
import mongoose, { ObjectId } from "mongoose";
import { studentSchema } from "../schemas/student.schema";


export interface IStudentModel extends IStudentEntity , Document{
    _id:ObjectId
} 


export const studentDB = mongoose.model<IStudentModel>("students",studentSchema)