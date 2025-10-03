import mongoose from "mongoose";
import { ICommunityPostModel } from "../models/communityPost.model";

export const communityPostSchema = new mongoose.Schema<ICommunityPostModel>({
  communityId: {
    type: mongoose.Schema.ObjectId,
    ref: "domains",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});
