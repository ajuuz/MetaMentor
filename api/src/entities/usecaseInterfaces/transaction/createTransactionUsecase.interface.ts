import { ITransactionEntity } from "domain/entities/transactionModel.entity";

export interface ICreateTransactionUsecase {
  execute(
    transactionDetails: Omit<ITransactionEntity, "_id" | "createdAt">
  ): Promise<void>;
}
