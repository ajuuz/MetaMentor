import { IBlackListTokenRepository } from "entities/repositoryInterfaces/blackListTokenRepository.interface";
import { ICommentRepository } from "entities/repositoryInterfaces/commentRepository.interface";
import { ICommunityPostRepository } from "entities/repositoryInterfaces/communityPostRepository.interface";
import { ICommunityRepository } from "entities/repositoryInterfaces/communityRepository.interface";
import { IDomainRepository } from "entities/repositoryInterfaces/domainRepository.interface";
import { IEnrolledLevelRepository } from "entities/repositoryInterfaces/enrolledLevelRepository.interface";
import { IFcmTokenRepository } from "entities/repositoryInterfaces/fcmTokenRepository.interface";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { INotificationRepository } from "entities/repositoryInterfaces/notificationRepository.interface";
import { IOtpRespository } from "entities/repositoryInterfaces/otp-repository.interface";
import { IReviewRepository } from "entities/repositoryInterfaces/reviewRepository.interface";
import { ISequenceNumberRepository } from "entities/repositoryInterfaces/sequenceNumberRepository.interface";
import { ISlotLockRepository } from "entities/repositoryInterfaces/slotLockRepository.interface";
import { ISlotRepository } from "entities/repositoryInterfaces/slotRepository.interface";
import { ITransactionRepository } from "entities/repositoryInterfaces/transactionRepository.interface";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IWalletRepository } from "entities/repositoryInterfaces/walletRepository.inteface";
import { BlackListTokenRepository } from "interfaceAdapters/repositories/blackListToken.repository";
import { CommentRepository } from "interfaceAdapters/repositories/comment.repository";
import { CommunityRepository } from "interfaceAdapters/repositories/community.repository";
import { CommunityPostRepository } from "interfaceAdapters/repositories/communityPost.repository";
import { DomainRepository } from "interfaceAdapters/repositories/domain.repository";
import { EnrolledLevelRepository } from "interfaceAdapters/repositories/enrolledLevel.repository";
import { FcmTokenRepository } from "interfaceAdapters/repositories/fcmToken.repository";
import { LevelRepository } from "interfaceAdapters/repositories/level.repository";
import { MentorRepository } from "interfaceAdapters/repositories/mentor.repository";
import { NotificationRepository } from "interfaceAdapters/repositories/notification.repository";
import { OtpRepository } from "interfaceAdapters/repositories/otp.repository";
import { ReviewRepository } from "interfaceAdapters/repositories/review.repository";
import { SequenceNumberRepository } from "interfaceAdapters/repositories/sequenceNumber.repository";
import { SlotRepository } from "interfaceAdapters/repositories/slot.repository";
import { SlotLockRepository } from "interfaceAdapters/repositories/slotLock.repository";
import { StudentRepository } from "interfaceAdapters/repositories/student.repository";
import { TransactionRepository } from "interfaceAdapters/repositories/transaction.repository";
import { UserRepository } from "interfaceAdapters/repositories/user.repository";
import { WalletRepository } from "interfaceAdapters/repositories/wallet.repository";
import { container } from "tsyringe";

export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IOtpRespository>("IOtpRepository", {
      useClass: OtpRepository,
    });

    container.register<IBlackListTokenRepository>("IBlackListTokenRepository", {
      useClass: BlackListTokenRepository,
    });

    container.register<IUserRespository>("IUserRepository", {
      useClass: UserRepository,
    });

    container.register<IFcmTokenRepository>("IFcmTokenRepository", {
      useClass: FcmTokenRepository,
    });

    container.register("IStudentRepository", {
      useClass: StudentRepository,
    });

    container.register<IMentorRepository>("IMentorRepository", {
      useClass: MentorRepository,
    });

    container.register<IDomainRepository>("IDomainRepository", {
      useClass: DomainRepository,
    });

    container.register<ILevelRepository>("ILevelRepository", {
      useClass: LevelRepository,
    });

    container.register<ICommunityRepository>("ICommunityRepository", {
      useClass: CommunityRepository,
    });

    container.register<ISlotRepository>("ISlotRepository", {
      useClass: SlotRepository,
    });

    container.register<IReviewRepository>("IReviewRepository", {
      useClass: ReviewRepository,
    });

    container.register<ISlotLockRepository>("ISlotLockRepository", {
      useClass: SlotLockRepository,
    });

    container.register<IWalletRepository>("IWalletRepository", {
      useClass: WalletRepository,
    });

    container.register<ITransactionRepository>("ITransactionRepository", {
      useClass: TransactionRepository,
    });

    container.register<INotificationRepository>("INotificationRepository", {
      useClass: NotificationRepository,
    });

    container.register<ICommunityPostRepository>("ICommunityPostRepository", {
      useClass: CommunityPostRepository,
    });
    container.register<ICommentRepository>("ICommentRepository", {
      useClass: CommentRepository,
    });

    //sequence number
    container.register<ISequenceNumberRepository>("ISequenceNumberRepository", {
      useClass: SequenceNumberRepository,
    });

    //enrolledLevel
    container.register<IEnrolledLevelRepository>("IEnrolledLevelRepository", {
      useClass: EnrolledLevelRepository,
    });
  }
}
