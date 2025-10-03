import { ISequenceNumberEntity } from "domain/entities/sequenceNumberModel.entity";

import mongoose, { Document, ObjectId } from "mongoose";

import { sequenceNumberSchema } from "../schemas/sequenceNumber.schema";

export interface ISequenceNumberModel
  extends Omit<ISequenceNumberEntity, "_id">,
    Document<ObjectId> {}

export const SequenceNumberModel = mongoose.model(
  "SequenceNumber",
  sequenceNumberSchema
);
