import mongoose, { Document, ObjectId } from "mongoose";

import { ICommunityPostCommentEntity } from "domain/entities/communityPostComment.enitity";
import { communityPostCommentSchema } from "../schemas/communityPostComment.schema";

export interface ICommunityPostCommentModel extends Omit<ICommunityPostCommentEntity, "_id"|'postId'|"commenterId">, Document {
  _id: ObjectId;
  postId: ObjectId;
  commenterId:ObjectId
}

export const communityPostCommentModel = mongoose.model<ICommunityPostCommentModel>(
  "Comment",
  communityPostCommentSchema
);
