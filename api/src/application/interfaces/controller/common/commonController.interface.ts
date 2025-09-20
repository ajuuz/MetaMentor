import { NextFunction, Request, Response } from "express";

interface MulterRequest extends Request {
  files: Express.Multer.File[];
}

export interface ICommonController {
  uploadImage(
    req: MulterRequest,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  eventSource(req: Request, res: Response, next: NextFunction): Promise<void>;
  getWalletAndTransactions(req: Request, res: Response): Promise<void>;
}
