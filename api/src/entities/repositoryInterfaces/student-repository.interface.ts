import { IGetStudentsForAdmin, IStudentEntity } from "entities/modelEntities/student-model.entity";
import { IStudentModel } from "frameworks/database/models/student.model";
import { ObjectId } from "mongoose";

import { IBaseRepository } from "./baseRepository.interface";

export interface IStudentRepository extends IBaseRepository<IStudentEntity,IStudentModel>{

    createStudent(userId:ObjectId):Promise<void>;
    findStudents(filter:any,skip:number,limit:number):Promise<{ data: IGetStudentsForAdmin[]; totalDocuments: number }>;
    updateStatus(userId:string,status:boolean):Promise<number>
    getStatus(userId:string):Promise<IStudentEntity|null>
    pushDomain(userId:string,domainId:string):Promise<void>
}