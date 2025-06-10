import { ObjectId } from "mongoose";

export interface IMentorEntity{
    userId:ObjectId,
    about:string,
    domains:ObjectId[],
    isBlocked:boolean,
    cv:string,
    experienceCirtificate:string,
    skills:string[],
    workedAt:string[],
    isVerified:boolean,
    isRejected:boolean
}