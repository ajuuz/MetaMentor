import { ITransactionEntity } from "domain/entities/transactionModel.entity";
import { ITransactionRepository } from "domain/repositoryInterfaces/transactionRepository.interface";
import { transactionModel } from "infrastructure/database/models/transaction.model";
import mongoose from "mongoose";
import { injectable } from "tsyringe";

@injectable()
export class TransactionRepository implements ITransactionRepository {
  async createTransaction(
    transactionDetails: Omit<ITransactionEntity, "_id" | "createdAt">
  ): Promise<void> {
    const newTransaction = new transactionModel(transactionDetails);
    await newTransaction.save();
  }

  async getTransactionsAggregated(
    walletId: string,
    skip: number,
    limit: number
  ): Promise<{ transactions: ITransactionEntity[]; totalPages: number }> {
    try {
      const ObjectId = mongoose.Types.ObjectId;

      // Step 1: Get total count of matching transactions
      const totalCountResult = await transactionModel.countDocuments({
        walletId: new ObjectId(walletId),
      });
      const totalPages = Math.ceil(totalCountResult / limit);

      // Step 2: Get paginated transactions with aggregation
      const transactions = await transactionModel.aggregate([
        { $match: { walletId: new ObjectId(walletId) } },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },

        {
          $lookup: {
            from: "reviews",
            localField: "reviewId",
            foreignField: "_id",
            as: "review",
          },
        },
        { $unwind: "$review" },

        {
          $lookup: {
            from: "domains",
            localField: "review.domainId",
            foreignField: "_id",
            as: "domain",
          },
        },
        { $unwind: "$domain" },

        {
          $lookup: {
            from: "levels",
            localField: "review.levelId",
            foreignField: "_id",
            as: "level",
          },
        },
        { $unwind: "$level" },

        {
          $project: {
            _id: 1,
            walletId: 1,
            type: 1,
            amount: 1,
            description: 1,
            createdAt: 1,
            reviewId: "$review._id",
            domainName: "$domain.name",
            levelName: "$level.name",
          },
        },
      ]);

      return { transactions, totalPages };
    } catch (error) {
      console.error("Failed to aggregate transactions:", error);
      throw new Error("Could not aggregate transactions");
    }
  }
}
