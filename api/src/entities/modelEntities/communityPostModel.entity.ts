import { ObjectId } from "mongoose";

export interface ICommunityPostEntity{
    _id:ObjectId,
    communityId:ObjectId,
    studentId:ObjectId,
    title:string,
    image?:string,
    description:string,
    postedAt:Date,
    isBlocked:boolean
}