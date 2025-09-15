import { inject, injectable } from "tsyringe";
import { NextFunction, Request, Response } from "express";
import { ILoggerService } from "application/interfaces/service/loggerService.interface";
import { ILoggerMiddleware } from "application/interfaces/middleware/loggerMiddleware.interface";

@injectable()
export class LoggerMiddleware implements ILoggerMiddleware {
  constructor(
    @inject("ILoggerService")
    private _logger: ILoggerService
  ) {}

  public handle(req: Request, res: Response, next: NextFunction) {
    this._logger.info("in logger ->", {
      req: req.method,
      url: req.url,
      timestamp: new Date().toISOString(),
    });

    next();
  }
}
