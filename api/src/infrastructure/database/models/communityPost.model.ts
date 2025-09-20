import { ICommunityPostEntity } from "domain/entities/communityPostModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";
import { communityPostSchema } from "../schemas/communityPost.schema";

export interface ICommunityPostModel
  extends Omit<ICommunityPostEntity, "_id">,
    Document {
  _id: ObjectId;
}

export const communityPostModel = mongoose.model<ICommunityPostModel>(
  "CommunityPost",
  communityPostSchema
);
