import { INotificationEntity } from "entities/modelEntities/notificationModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { notificationSchema } from "../schemas/notification.schema";



export interface INotificationModel extends INotificationEntity,Document{
    _id:ObjectId
}

export const notificationModel = mongoose.model<INotificationModel>('notifications',notificationSchema)