import type { NOTIFICATION_TYPE } from "shared/constants";

export interface INotificationEntity{
    _id:string
    userId:string,
    type:NOTIFICATION_TYPE,
    title:string,
    body:string,
    navigate:string|null
    isRead:boolean,
    createdAt:Date,
    updatedAt:Date
}