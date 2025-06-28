import { IDomainEntity } from "entities/modelEntities/domainModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";
import { domainSchema } from "../schemas/domain.schema";


export interface IDomainModel extends Omit<IDomainEntity,"_id">,Document{
    _id:ObjectId
}

export const domainDB = mongoose.model<IDomainModel>('domains',domainSchema)