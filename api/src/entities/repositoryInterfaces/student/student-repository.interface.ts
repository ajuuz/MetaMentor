import { ObjectId } from "mongoose";


export interface IStudentRepository{

    createStudent(userId:ObjectId):Promise<void>
}