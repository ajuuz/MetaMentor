import { ITransactionEntity } from "entities/modelEntities/transactionModel.entity";
import mongoose, { ObjectId } from "mongoose";
import { transactionSchema } from "../schemas/transaction.schema";


export interface ITransactionModel extends Omit<ITransactionEntity,'_id'>,Document{
    _id:ObjectId
}

export const transactionModel = mongoose.model<ITransactionModel>('transactions',transactionSchema)