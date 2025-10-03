import mongoose from "mongoose";

import { IEnrolledLevelModel } from "../models/enrolledLevel.model";

export const enrolledLevelSchema = new mongoose.Schema<IEnrolledLevelModel>({
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  domainId: {
    type: mongoose.Schema.ObjectId,
    ref: "domains",
    required: true,
  },
  levelId: {
    type: mongoose.Schema.ObjectId,
    ref: "levels",
    required: true,
  },
  assignments: {
    type: [String],
    default: [],
  },
});
