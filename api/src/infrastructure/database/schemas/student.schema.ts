import { ISelectedDomain } from "domain/entities/student-model.entity";
import mongoose from "mongoose";

import { IStudentModel } from "../models/student.model";
import { SequenceNumberModel } from "../models/sequenceNumber.model";

const domainSchema = new mongoose.Schema<ISelectedDomain>(
  {
    domainId: {
      type: mongoose.Schema.ObjectId,
      ref: "domains",
      required: true,
    },
    currentLevel: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }
);

export const studentSchema = new mongoose.Schema<IStudentModel>({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: null,
  },
  domains: {
    type: [domainSchema],
    required: true,
    default: [],
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  point: {
    type: Number,
    default: 0,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  premiumPlan: {
    type: mongoose.Schema.ObjectId,
    ref: "plans",
    default: null,
  },
  premiumExpiry: {
    type: Date,
    default: null,
  },
  completedChallenges: {
    type: [mongoose.Schema.ObjectId],
    ref: "challenges",
    default: [],
  },
});

studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const studentSequenceDocument = await SequenceNumberModel.findOneAndUpdate(
      { name: "studentSeq" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.seq = studentSequenceDocument.seq;
  }
  next();
});
