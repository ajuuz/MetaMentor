import { ITransactionRepository } from "domain/repositoryInterfaces/transactionRepository.interface";
import { ICreateTransactionUsecase } from "application/usecase/interfaces/transaction/createTransactionUsecase.interface";
import { inject, injectable } from "tsyringe";
import { ITransactionEntity } from "domain/entities/transactionModel.entity";

@injectable()
export class CreateTransactionUsecase implements ICreateTransactionUsecase {
  constructor(
    @inject("ITransactionRepository")
    private _transactionRepository: ITransactionRepository
  ) {}
  async execute(
    transactionDetails: Omit<ITransactionEntity, "_id" | "createdAt">
  ): Promise<void> {
    await this._transactionRepository.createTransaction(transactionDetails);
  }
}
