import { INotificationEntity } from "domain/entities/notificationModel.entity";

import mongoose, { Document, ObjectId } from "mongoose";

import { notificationSchema } from "../schemas/notification.schema";

export interface INotificationModel
  extends Omit<INotificationEntity, "_id" | "userId">,
    Document<ObjectId> {
  _id: ObjectId;
  userId: ObjectId;
}

export const notificationModel = mongoose.model<INotificationModel>(
  "notifications",
  notificationSchema
);
