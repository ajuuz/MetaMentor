import { IStudentEntity } from "entities/modelEntities/student-model.entity";
import { IStudentModel } from "frameworks/database/models/student.model";
import { ObjectId } from "mongoose";
import {GetAllStudentResponseDTO} from 'shared/dto/studentDTO'

import { IBaseRepository } from "./baseRepository.interface";

export interface IStudentRepository extends IBaseRepository<IStudentEntity,IStudentModel>{

    createStudent(userId:ObjectId):Promise<void>;
    findStudents(filter:any,skip:number,limit:number):Promise<Omit<GetAllStudentResponseDTO,'totalPages'>>;
    updateStatus(userId:string,status:boolean):Promise<number>
    getStatus(userId:string):Promise<IStudentEntity|null>
    pushDomain(userId:string,domainId:string):Promise<void>
}