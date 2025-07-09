import { IMentorSlotEntity } from "entities/modelEntities/mentorSlotModel.entity";
import { ObjectId } from "mongoose";

export interface IMentorSlotModel extends Omit<IMentorSlotEntity,'_id'>,Document{
    _id:ObjectId
}

