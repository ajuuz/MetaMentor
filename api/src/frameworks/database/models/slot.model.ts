import { ISlotEntity } from "entities/modelEntities/slotModel.entity";
import mongoose, { ObjectId } from "mongoose";
import { slotSchema } from "../schemas/slot.schema";


export interface ISlotModel extends ISlotEntity,Document{
    _id:ObjectId
}

export const slotModel = mongoose.model<ISlotModel>('slots',slotSchema)