import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { slotSchema } from "../schemas/slot.schema";

export interface ISlotModel
  extends Omit<ISlotEntity, "_id" | "mentorId" | "weekSlots">,
    Document<ObjectId> {
  mentorId: ObjectId;
  weekSlots: {
    Monday: { _id: ObjectId; start: number; end: number; enabled: boolean }[];
    Tuesday: { _id: ObjectId; start: number; end: number; enabled: boolean }[];
    Wednesday: {_id: ObjectId;start: number; end: number;enabled: boolean;}[];
    Thursday: { _id: ObjectId; start: number; end: number; enabled: boolean }[];
    Friday: { _id: ObjectId; start: number; end: number; enabled: boolean }[];
    Saturday: { _id: ObjectId; start: number; end: number; enabled: boolean }[];
    Sunday: { _id: ObjectId; start: number; end: number; enabled: boolean }[];
  };
}

export const slotModel = mongoose.model<ISlotModel>("slots", slotSchema);
