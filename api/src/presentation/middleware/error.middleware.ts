import { IErrorMiddleware } from "application/interfaces/middleware/error-middleware.interface";
import { ILoggerService } from "application/interfaces/service/loggerService.interface";
import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGE, HTTP_STATUS } from "shared/constants";
import { CustomError } from "domain/errors/customError";
import { NotFoundError } from "domain/errors/notFounError";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ErrorMiddleware implements IErrorMiddleware {
  constructor(
    @inject("ILoggerService")
    private _logger: ILoggerService
  ) {}

  public handleError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    let message = ERROR_MESSAGE.SERVER_ERROR;
    if (err instanceof CustomError) {
      statusCode = err.statusCode;
      message = err.message;
      if (err instanceof ValidationError) {
        message = err.message;
      }
    } else if (err instanceof NotFoundError) {
      statusCode = err.statusCode;
      message = err.message;
    }

    console.log(`statusCode ${statusCode}`, `message ${message}`);
    this._logger.error("Error", {
      path: req.path,
      method: req.method,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });

    res.status(statusCode).json({ success: false, message });
  }
}
