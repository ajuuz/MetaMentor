import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { IAuthUsecase } from "entities/usecaseInterfaces/auth/send-otp-usecase.interface";
import { EmailService } from "interfaceAdapters/services/email.service";
import { container } from "tsyringe";
import { AuthUsecase } from "useCases/auth/auth.usecase";

export class UseCaseRegistory{

    static RegisterUsecases():void{

        container.register<IAuthUsecase>('IAuthUsecase',{
            useClass:AuthUsecase
        })

        //register service
        container.register<IEmailService>('IEmailService',{
            useClass:EmailService
        })
    }
}