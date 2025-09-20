import { ObjectId } from "mongoose";


export interface ICommentEntity{
    _id:ObjectId,
    postId:ObjectId,
    commenterId:ObjectId,
    comment:string,
    commentedAt:Date,
    isBlocked:boolean
}