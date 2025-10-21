import mongoose from "mongoose";
import { ICommentModel } from "../models/comment.model";

export const commentSchema = new mongoose.Schema<ICommentModel>({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommunityPost",
    required: true,
  },
  parentCommentId: {            // For nested replies
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  commenterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
    required: true,
  },
  text: {                       // Changed from "comment" to "text" to match interface
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});
