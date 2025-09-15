import { ITransactionEntity } from "domain/entities/transactionModel.entity";

export interface ITransactionRepository {
  createTransaction(
    transactionDetails: Omit<ITransactionEntity, "_id" | "createdAt">
  ): Promise<void>;
  getTransactionsAggregated(
    walletId: string,
    skip: number,
    limit: number
  ): Promise<{ transactions: ITransactionEntity[]; totalPages: number }>;
}
