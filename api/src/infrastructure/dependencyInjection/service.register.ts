import { IEmailService } from "application/interfaces/service/email-service.interface";
import { ILoggerService } from "application/interfaces/service/loggerService.interface";
import { IPaymentScheduleService } from "application/interfaces/service/paymentScheduleService.interface";
import { IPushNotificationService } from "application/interfaces/service/pushNotificationService.interface";
import { IReminderScheduleService } from "application/interfaces/service/reminderScheduleService.interface";
import { ITokenService } from "application/interfaces/service/tokenService.interface";
import { EmailService } from "infrastructure/service/email.service";
import { LoggerService } from "infrastructure/service/logger.service";
import { PaymentScheduleService } from "infrastructure/service/paymentSchedule.service";
import { PushNotificationService } from "infrastructure/service/pushNotification.service";
import { ReminderScheduleService } from "infrastructure/service/reminderSchedule.service";
import { TokenService } from "infrastructure/service/token.service";
import { container } from "tsyringe";

export class ServiceRegistory {
  static registerServices(): void {
    container.registerSingleton<IEmailService>("IEmailService", EmailService);

    container.registerSingleton<ITokenService>("ITokenService", TokenService);

    container.registerSingleton<IPushNotificationService>(
      "IPushNotificationService",
      PushNotificationService
    );

    container.registerSingleton<IReminderScheduleService>(
      "IReminderScheduleService",
      ReminderScheduleService
    );
    
    container.registerSingleton<IPaymentScheduleService>(
      "IPaymentScheduleService",
      PaymentScheduleService
    );

    container.registerSingleton<ILoggerService>(
      "ILoggerService",
      LoggerService
    );
  }
}
