import { IFcmTokenEntity } from "domain/entities/fcmTokenModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { fcmTokenSchema } from "../schemas/fcmToken.schema";

export interface IFcmTokenModel
  extends Omit<IFcmTokenEntity, "userId">,
    Document<ObjectId> {
  userId: ObjectId;
}

export const fcmTokenModel = mongoose.model<IFcmTokenModel>(
  "fcmTokens",
  fcmTokenSchema
);
