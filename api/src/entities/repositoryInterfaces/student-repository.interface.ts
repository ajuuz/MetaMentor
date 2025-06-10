import { ObjectId } from "mongoose";
import {GetAllStudentResponseDTO} from 'shared/dto/studentDTO'

export interface IStudentRepository{

    createStudent(userId:ObjectId):Promise<void>;
    find(filter:any,skip:number,limit:number):Promise<Omit<GetAllStudentResponseDTO,'totalPages'>>;
    updateStatus(userId:string,status:boolean):Promise<number>
}