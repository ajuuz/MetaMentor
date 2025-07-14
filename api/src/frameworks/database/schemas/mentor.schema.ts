import mongoose from "mongoose";
import { IMentorModel } from "../models/mentor.model";

export const mentorSchema = new mongoose.Schema<IMentorModel>({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  about: {
    type: String,
    required: true,
  },
  domains: {
    type: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'domains'
      }
    ],
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  cv: {
    type: String,
    required: true,
  },
  experienceCirtificate: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  workedAt: {
    type: [String],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isRejected:{
    type:Boolean,
    default:false
  }
});
