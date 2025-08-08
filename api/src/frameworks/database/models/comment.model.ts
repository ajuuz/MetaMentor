import mongoose, { Document, ObjectId } from "mongoose";

import { ICommentEntity } from "entities/modelEntities/commentModel.entity";
import { commentSchema } from "../schemas/comment.schema";


export interface ICommentModel extends Omit<ICommentEntity,'_id'>,Document{
    _id:ObjectId
}

export const commentModel = mongoose.model<ICommentModel>('Comment',commentSchema)