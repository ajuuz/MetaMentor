import mongoose from "mongoose";

import { ISequenceNumberModel } from "../models/sequenceNumber.model";

export const sequenceNumberSchema = new mongoose.Schema<ISequenceNumberModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    required: true,
    default: 0,
  },
});
