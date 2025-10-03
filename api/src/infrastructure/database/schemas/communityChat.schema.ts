import mongoose from "mongoose";

import { ICommunityChatModel } from "../models/communityChat.model";

export const communityChatSchema = new mongoose.Schema<ICommunityChatModel>(
  {
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
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
