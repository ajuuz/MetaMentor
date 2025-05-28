import { container, injectable } from "tsyringe";
import { OtpRepository } from "interfaceAdapters/repositories/auth/otp.repository";
import { IOtpRespository } from "entities/repositoryInterfaces/auth/otp-repository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user/user-repository.interface";
import { UserRepository } from "interfaceAdapters/repositories/user/user.repository";

@injectable()
export class RepositoryRegistry{
    static registerRepositories():void{

        container.register<IOtpRespository>("IOtpRepository",{
            useClass:OtpRepository
        })
        
        container.register<IUserRespository>('IUserRepository',{
            useClass:UserRepository
        })
    }
}