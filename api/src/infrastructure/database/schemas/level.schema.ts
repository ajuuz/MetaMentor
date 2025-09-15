import mongoose from "mongoose";

import { ILevelModel } from "../models/level.model";
import { LEVEL_TASK_TYPE } from "shared/constants";

const taskSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: LEVEL_TASK_TYPE,
    default: LEVEL_TASK_TYPE.TEXT,
  },
  content: {
    type: String,
    required: true,
  },
});

export const levelSchema = new mongoose.Schema<ILevelModel>({
  domainId: {
    type: mongoose.Schema.ObjectId,
    ref: "domains",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  taskFile: {
    type: String,
    required: true,
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});
