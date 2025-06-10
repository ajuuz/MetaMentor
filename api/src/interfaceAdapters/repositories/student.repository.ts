import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import { studentDB } from "frameworks/database/models/student.model";
import { ObjectId } from "mongoose";

import {GetAllStudentResponseDTO} from 'shared/dto/studentDTO'


export class StudentRepository implements IStudentRepository{

    async createStudent(userId:ObjectId):Promise<void>{
        const newStudent = new studentDB({userId})
        await newStudent.save()
    }

    async find(filter: any, skip: number, limit: number):Promise<Omit<GetAllStudentResponseDTO,'totalPages'>> {
        const [students,totalDocuments] = await Promise.all([
            studentDB.aggregate([
                {$match:filter},
                {$sort:{createdAt:-1}},
                {$skip:skip},
                {$limit:limit},
                {$lookup:{
                    from:'users',
                    localField:'userId',
                    foreignField:'_id',
                    as:'user'
                }},
                {$unwind:"$user"},
                {$project:{
                    isBlocked:1,
                    userId:1,
                    point:1,
                    isPremium:1,
                    premiumPlan:1,
                    premiumExpiry:1,
                    name:'$user.name',
                    country:'$user.country',
                    gender:'$user.gender',
                    email:'$user.email',
                    mobileNumber:'$user.mobileNumber'
                }}
            ]),
            studentDB.countDocuments(filter)
        ])
        return {students,totalDocuments}
    }

    async updateStatus(userId: string, status: boolean): Promise<number> {
        const update=await studentDB.updateOne({userId},{$set:{isBlocked:status}})
        return update.modifiedCount
    }

    
    
}