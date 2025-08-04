import { IFcmTokenEntity } from "entities/modelEntities/fcmTokenModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";
import { fcmTokenSchema } from "../schemas/fcmToken.schema";



export interface IFcmTokenModel extends IFcmTokenEntity , Document{
    _id:ObjectId
}

export const fcmTokenModel = mongoose.model<IFcmTokenModel>('fcmTokens',fcmTokenSchema)