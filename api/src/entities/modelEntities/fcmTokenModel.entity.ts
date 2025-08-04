import { ObjectId } from "mongoose";


export interface IFcmTokenEntity{
    userId:ObjectId,
    fcmToken:string,
    createdAt:Date
}