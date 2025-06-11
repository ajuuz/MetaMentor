import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { ITokenService } from "entities/serviceInterfaces/tokenService.interface";
import { EmailService } from "interfaceAdapters/services/email.service";
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
  }
}
