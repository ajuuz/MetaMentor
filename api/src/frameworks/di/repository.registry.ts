import { container, injectable } from "tsyringe";
import { OtpRepository } from "interfaceAdapters/repositories/otp.repository";
import { IOtpRespository } from "entities/repositoryInterfaces/otp-repository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { UserRepository } from "interfaceAdapters/repositories/user.repository";
import { StudentRepository } from "interfaceAdapters/repositories/student.repository";
import { MentorRepository } from "interfaceAdapters/repositories/mentor.repository";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IBlackListTokenRepository } from "entities/repositoryInterfaces/blackListTokenRepository.interface";
import { BlackListTokenRepository } from "interfaceAdapters/repositories/blackListToken.repository";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { LevelRepository } from "interfaceAdapters/repositories/level.repository";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { DomainRepository } from "interfaceAdapters/repositories/domain.repository";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { CommunityRepository } from "interfaceAdapters/repositories/community.repository";

export class RepositoryRegistry{
    static registerRepositories():void{

        container.register<IOtpRespository>("IOtpRepository",{
            useClass:OtpRepository
        })

        container.register<IBlackListTokenRepository>('IBlackListTokenRepository',{
            useClass:BlackListTokenRepository
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

        container.register<IDomainRepository>('IDomainRepository',{
            useClass:DomainRepository
        })

        container.register<ILevelRepository>('ILevelRepository',{
            useClass:LevelRepository
        })

        container.register<ICommunityRepository>('ICommunityRepository',{
            useClass:CommunityRepository
        })
    }
}