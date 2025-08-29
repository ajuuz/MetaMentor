import { IUserEntity } from "entities/modelEntities/user-model.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { userSchema } from "../schemas/user.schema";

export interface IUserModel extends Omit<IUserEntity,'_id'> , Document<ObjectId>{
}

export const userModel = mongoose.model('users',userSchema)