import { ObjectId } from "mongoose";

export interface IMentorEntity{
    userId:ObjectId,
    about:string,
    domains:ObjectId[],
    isBlocked:boolean,
    cv:string,
    experienceCirtificate:string,
    rating:{
        totalStars:number,
        noOfRaters:number,
    },
    skills:string[],
    workedAt:string[],
    isVerified:boolean,
    isRejected:boolean,
    fee:number
}