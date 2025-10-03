import mongoose from "mongoose";

import { ICommunityPostLikeModel } from "../models/communityPostLike.model";

export const communityPostLikeSchema =
  new mongoose.Schema<ICommunityPostLikeModel>(
    {
      postId: {
        type: mongoose.Schema.ObjectId,
        ref: "CommunityPost",
        required: true,
      },
      likedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "students",
        required: true,
      },
    },
  );
