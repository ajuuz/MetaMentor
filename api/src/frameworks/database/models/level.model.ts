
import { ILevelEntity } from "entities/modelEntities/levelModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";
import { levelSchema } from "../schemas/level.schema";

export interface ILevelModel extends Omit<ILevelEntity,"_id">,Document{
    _id:ObjectId
}

export const levelModel = mongoose.model<ILevelModel>('levels',levelSchema);