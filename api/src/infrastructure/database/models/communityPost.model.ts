import { ICommunityPostEntity } from "domain/entities/communityPostModel.entity";

import mongoose, { Document, ObjectId } from "mongoose";

import { communityPostSchema } from "../schemas/communityPost.schema";

export interface ICommunityPostModel
  extends Omit<ICommunityPostEntity, "_id"|'communityId'|'studentId'>,
    Document {
  _id: ObjectId;
  communityId:ObjectId
  studentId:ObjectId
}

export const communityPostModel = mongoose.model<ICommunityPostModel>(
  "CommunityPost",
  communityPostSchema
);
