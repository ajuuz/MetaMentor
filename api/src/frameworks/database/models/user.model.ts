import { IUserEntity } from "entities/modelEntities/user-model.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { userSchema } from "../schemas/user.schema";

export interface IUserModel extends IUserEntity , Document{
    _id:ObjectId
}

export const userModel = mongoose.model('users',userSchema)