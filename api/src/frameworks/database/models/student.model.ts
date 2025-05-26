import { IStudentEntity } from "entities/modelEntities/student-model.entity";
import { ObjectId } from "mongoose";


export interface IStudentModel extends IStudentEntity , Document{
    _id:ObjectId
} 