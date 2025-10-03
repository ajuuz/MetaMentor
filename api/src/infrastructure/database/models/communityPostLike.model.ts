import { ICommunityPostLikeEntity } from "domain/entities/communityPostLike.entity";

import mongoose, { Document, ObjectId } from "mongoose";

import { communityPostLikeSchema } from "../schemas/communityPostLike.schema";

export interface ICommunityPostLikeModel
  extends Omit<ICommunityPostLikeEntity, "_id" | "postId" | "likedBy">,
    Document {
  _id: ObjectId;
  postId: ObjectId;
  likedBy: ObjectId;
}

export const communityPostLikeModel = mongoose.model<ICommunityPostLikeModel>(
  "Like",
  communityPostLikeSchema
);
