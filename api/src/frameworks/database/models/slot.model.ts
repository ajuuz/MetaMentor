import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { slotSchema } from "../schemas/slot.schema";


export interface ISlotModel extends Omit<ISlotEntity,'_id'>,Document{
    _id:ObjectId
}

export const slotModel = mongoose.model<ISlotModel>('slots',slotSchema)