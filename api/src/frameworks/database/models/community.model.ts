import { ICommunityEntity } from "entities/modelEntities/communityModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";
import { communitySchema } from "../schemas/community.schema";


export interface ICommunityModel extends Omit<ICommunityEntity,'_id'>,Document{
    _id:ObjectId
}

export const communityModel = mongoose.model<ICommunityModel>('communities',communitySchema)