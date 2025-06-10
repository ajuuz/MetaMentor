import { container, injectable } from "tsyringe";
import { OtpRepository } from "interfaceAdapters/repositories/otp.repository";
import { IOtpRespository } from "entities/repositoryInterfaces/otp-repository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { UserRepository } from "interfaceAdapters/repositories/user.repository";
import { StudentRepository } from "interfaceAdapters/repositories/student.repository";
import { MentorRepository } from "interfaceAdapters/repositories/mentor.repository";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";

@injectable()
export class RepositoryRegistry{
    static registerRepositories():void{

        container.register<IOtpRespository>("IOtpRepository",{
            useClass:OtpRepository
        })
        
        container.register<IUserRespository>('IUserRepository',{
            useClass:UserRepository
        })

        container.register('IStudentRepository',{
            useClass:StudentRepository
        })

        container.register<IMentorRepository>('IMentorRepository',{
            useClass:MentorRepository
        })
    }
}