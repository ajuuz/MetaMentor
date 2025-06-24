import { IStudentEntity } from "entities/modelEntities/student-model.entity";
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
                    let: { userId: '$userId' },
                     pipeline: [
                       {
                         $match: {
                           $expr: {
                             $and: [
                               { $eq: ['$_id', '$$userId'] },
                               { $eq: ['$role', 'user'] } 
                             ]
                           }
                         }
                       }
                     ],
                    as:'user'
                }},
                {$unwind:"$user"},
                {$project:{
                    userId:1,
                    isBlocked:1,
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


    async updateOne(filter:any,update:any):Promise<void>{
        await studentDB.updateOne(filter,update)
    }

    async updateStatus(userId: string, status: boolean): Promise<number> {
        const update=await studentDB.updateOne({userId},{$set:{isBlocked:status}})
        return update.modifiedCount
    }

     async getStatus(userId:string):Promise<IStudentEntity|null>{
        const user=await studentDB.findOne({userId})
        return user;
    }
    
}