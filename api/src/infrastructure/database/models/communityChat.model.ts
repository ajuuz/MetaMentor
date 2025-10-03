import { ICommunityChatEnitity } from "domain/entities/communityChat.entity";

import mongoose, { Document, ObjectId } from "mongoose";

import { communityChatSchema } from "../schemas/communityChat.schema";

export interface ICommunityChatModel
  extends Omit<ICommunityChatEnitity, "_id" | "communityId" | "studentId">,
    Document {
  _id: ObjectId;
  communityId: ObjectId;
  studentId: ObjectId;
}

export const communityChatModel = mongoose.model<ICommunityChatModel>(
  "CommunityChat",
  communityChatSchema
);
