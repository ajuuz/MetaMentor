import { container } from "tsyringe";
import { OtpUsecase } from "useCases/user/otp.usecase";

export class UseCaseRegistory{

    static RegisterUsecases():void{

        container.register('IOtpUsecase',{
            useClass:OtpUsecase
        })
    }
}