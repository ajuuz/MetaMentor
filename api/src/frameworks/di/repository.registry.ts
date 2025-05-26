import { container, injectable } from "tsyringe";
import { OtpRepository } from "interfaceAdapters/repositories/auth/otp.repository";
import { IOtpRepository } from "entities/repositoryInterfaces/user/otp-repository.interface";

@injectable()
export class RepositoryRegistry{
    static registerRepositories():void{
        container.register<IOtpRepository>("IOtpRepository",{
            useClass:OtpRepository
        })
    }
}