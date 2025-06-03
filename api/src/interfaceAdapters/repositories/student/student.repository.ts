import { IStudentRepository } from "entities/repositoryInterfaces/student/student-repository.interface";
import { studentDB } from "frameworks/database/models/student.model";
import { ObjectId } from "mongoose";


export class StudentRepository implements IStudentRepository{

    async createStudent(userId:ObjectId):Promise<void>{
        const newStudent = new studentDB({userId})
        await newStudent.save()
    }
}