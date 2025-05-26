import { ObjectId } from "mongoose";

export interface IMentorModel{
    userId:ObjectId,
    about:string,
    domains:ObjectId[],
    cv:string,
    experienceCirtificate:string,
    skills:string[],
    workedAt:string[]
}