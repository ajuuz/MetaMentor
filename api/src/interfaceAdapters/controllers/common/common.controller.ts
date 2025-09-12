import { ICommonController } from "entities/controllerInterfaces/common/commonController.interface";
import { ITransactionRepository } from "entities/repositoryInterfaces/transactionRepository.interface";
import { IWalletRepository } from "entities/repositoryInterfaces/walletRepository.inteface";
import { IUploadImageUsecase } from "entities/usecaseInterfaces/common/uploadImageUsecase.interface";
import { NextFunction, Request, Response } from "express";
import sseClientManager from "frameworks/SSE/sseClientManager";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

@injectable()
export class CommonController implements ICommonController {
  constructor(
    @inject("IUploadImageUsecase")
    private _uploadImageUsecase: IUploadImageUsecase,
    @inject("ITransactionRepository")
    private _transactionRepository: ITransactionRepository,
    @inject("IWalletRepository")
    private _walletRepository: IWalletRepository
  ) {}

  async uploadImage(
    req: MulterRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const files: Express.Multer.File[] = req.files;
      const uploadedFiles = this._uploadImageUsecase.execute(files);
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully!",
        data: uploadedFiles,
      });
    } catch (error) {
      next(error);
    }
  }

  async eventSource(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();
    const email = req.params.email;
    sseClientManager.addClient(email, res);

    req.on("close", () => {
      res.end();
    });
  }

  async getWalletAndTransactions(
    req: Request,
    res: Response
  ): Promise<void> {
    const walletId = (req as ModifiedRequest).user.id;
    console.log(walletId)
    const { currentPage = "1", limit = "10" } = req.query;
    const page = parseInt(currentPage as string, 10);
    const perPage = parseInt(limit as string, 10);
    const skip = (page - 1) * perPage;
    const balance = await this._walletRepository.getBalance(walletId);
    const { transactions, totalPages } =
      await this._transactionRepository.getTransactionsAggregated(
        walletId,
        skip,
        perPage
      );

    res.status(200).json({
      balance,
      transactions,
      totalPages,
    });
  }
}
