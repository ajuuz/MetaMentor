import { IUserEntity } from "entities/modelEntities/user-model.entity";
import mongoose, { ObjectId } from "mongoose";
import { userSchema } from "../schemas/user.schema";

export interface IUserModel extends IUserEntity , Document{
    _id:ObjectId
}

export const userDB = mongoose.model('users',userSchema)