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
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { SlotRepository } from "interfaceAdapters/repositories/slot.repository";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { ReviewRepository } from "interfaceAdapters/repositories/review.repository";
import { ISlotLockRepository } from "entities/repositoryInterfaces/slotLockRepository.interface";
import { SlotLockRepository } from "interfaceAdapters/repositories/slotLock.repository";
import { IWalletRepository } from "entities/repositoryInterfaces/walletRepository.inteface";
import { WalletRepository } from "interfaceAdapters/repositories/wallet.repository";

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

        container.register<ISlotRepository>('ISlotRepository',{
            useClass:SlotRepository
        })

        container.register<IReviewRepository>('IReviewRepository',{
            useClass:ReviewRepository
        })

        container.register<ISlotLockRepository>('ISlotLockRepository',{
            useClass:SlotLockRepository
        })

        container.register<IWalletRepository>('IWalletRepository',{
            useClass:WalletRepository
        })
    }
}