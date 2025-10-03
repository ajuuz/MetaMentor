import { ICommentEntity } from "domain/entities/commentModel.entity";

import mongoose, { Document, ObjectId } from "mongoose";

import { commentSchema } from "../schemas/comment.schema";

export interface ICommentModel extends Omit<ICommentEntity, "_id">, Document {
  _id: ObjectId;
}

export const commentModel = mongoose.model<ICommentModel>(
  "Comment",
  commentSchema
);
