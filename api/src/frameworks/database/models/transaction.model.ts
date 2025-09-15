import { ITransactionEntity } from "domain/entities/transactionModel.entity";
import mongoose, { Document, ObjectId } from "mongoose";

import { transactionSchema } from "../schemas/transaction.schema";

export interface ITransactionModel
  extends Omit<ITransactionEntity, "_id" | "walletId" | "reviewId">,
    Document<ObjectId> {
  walletId: ObjectId;
  reviewId: ObjectId;
}

export const transactionModel = mongoose.model<ITransactionModel>(
  "transactions",
  transactionSchema
);
