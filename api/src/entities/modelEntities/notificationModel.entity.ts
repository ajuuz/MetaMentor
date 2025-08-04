import { ObjectId } from "mongoose";
import type { NOTIFICATION_TYPE } from "shared/constants";

export interface INotificationEntity{
    userId:ObjectId,
    type:NOTIFICATION_TYPE,
    title:string,
    body:string,
    isRead:boolean,
    createdAt:Date,
    updatedAt:Date
}