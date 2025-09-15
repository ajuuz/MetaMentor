import { IEmailService } from "application/interfaces/service/email-service.interface";
import { ILoggerService } from "application/interfaces/service/loggerService.interface";
import { IPushNotificationService } from "application/interfaces/service/pushNotificationService.interface";
import { ITokenService } from "application/interfaces/service/tokenService.interface";
import { EmailService } from "interfaceAdapters/services/email.service";
import { LoggerService } from "interfaceAdapters/services/logger.service";
import { PushNotificationService } from "interfaceAdapters/services/pushNotification.service";
import { TokenService } from "interfaceAdapters/services/token.service";
import { container } from "tsyringe";

export class ServiceRegistory {
  static registerServices(): void {
    container.register<IEmailService>("IEmailService", {
      useClass: EmailService,
    });

    container.register<ITokenService>("ITokenService", {
      useClass: TokenService,
    });

    container.register<IPushNotificationService>("IPushNotificationService", {
      useClass: PushNotificationService,
    });

    container.register<ILoggerService>("ILoggerService", {
      useClass: LoggerService,
    });
  }
}
