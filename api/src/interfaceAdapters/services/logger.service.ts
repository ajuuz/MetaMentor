import { ILoggerService } from "entities/serviceInterfaces/loggerService.interface";
import { logger } from "frameworks/logger/winston.logger";
import { injectable } from "tsyringe";


@injectable()
export class LoggerService implements ILoggerService{

  info(message: string, meta?: Record<string, any>) {
    logger.info(message, meta);
  }

  warn(message: string, meta?: Record<string, any>) {
    logger.warn(message, meta);
  }

  error(message: string, meta?: Record<string, any>) {
    logger.error(message, meta);
  }

  debug(message: string, meta?: Record<string, any>) {
    logger.debug(message, meta);
  }
}