import mongoose from "mongoose";
import { ICommunityPostCommentModel } from "../models/communityPostComment.model";

export const communityPostCommentSchema = new mongoose.Schema<ICommunityPostCommentModel>({
  postId: {
    type: mongoose.Schema.ObjectId,
    ref: "CommunityPost",
    required: true,
  },
  commenterId: {
    type: mongoose.Schema.ObjectId,
    ref: "students",
    required: true,
  },
  content: {
    type: String,
  },
},{timestamps:true});
