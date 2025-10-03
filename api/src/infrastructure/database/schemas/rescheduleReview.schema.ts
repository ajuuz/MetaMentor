import mongoose from "mongoose";
import { ROLES } from "shared/constants";

import { IRescheduleReviewModel } from "../models/rescheduleReview.model";

const slotSchema = new mongoose.Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { _id: false }
);

export const rescheduleReviewSchema =
  new mongoose.Schema<IRescheduleReviewModel>(
    {
      initiativeBy: {
        type: String,
        enum: [ROLES.USER, ROLES.MENTOR],
      },
      reviewId: {
        type: mongoose.Schema.ObjectId,
        ref: "reviews",
        required: true,
      },
      studentId: {
        type: mongoose.Schema.ObjectId,
        ref: "students",
        required: true,
      },
      mentorId: {
        type: mongoose.Schema.ObjectId,
        ref: "students",
        required: true,
      },
      slot: {
        type: slotSchema,
        required: true,
      },
      studentText: {
        type: String,
        default: "",
      },
      mentorText: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  );
