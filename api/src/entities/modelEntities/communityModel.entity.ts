import { ObjectId } from "mongoose";


export interface ICommunityEntity{
    _id:ObjectId,
    communityId:ObjectId,
    name:string
    isBlocked:boolean
}