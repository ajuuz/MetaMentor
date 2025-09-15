import { IBlackListTokenRepository } from "domain/repositoryInterfaces/blackListTokenRepository.interface";
import { ICommentRepository } from "domain/repositoryInterfaces/commentRepository.interface";
import { ICommunityPostRepository } from "domain/repositoryInterfaces/communityPostRepository.interface";
import { ICommunityRepository } from "domain/repositoryInterfaces/communityRepository.interface";
import { IDomainRepository } from "domain/repositoryInterfaces/domainRepository.interface";
import { IEnrolledLevelRepository } from "domain/repositoryInterfaces/enrolledLevelRepository.interface";
import { IFcmTokenRepository } from "domain/repositoryInterfaces/fcmTokenRepository.interface";
import { ILevelRepository } from "domain/repositoryInterfaces/levelRepository.interface";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { INotificationRepository } from "domain/repositoryInterfaces/notificationRepository.interface";
import { IOtpRespository } from "domain/repositoryInterfaces/otp-repository.interface";
import { IRescheduleReviewRepository } from "domain/repositoryInterfaces/rescheduleReviewRepository.interface";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import { ISequenceNumberRepository } from "domain/repositoryInterfaces/sequenceNumberRepository.interface";
import { ISlotLockRepository } from "domain/repositoryInterfaces/slotLockRepository.interface";
import { ISlotRepository } from "domain/repositoryInterfaces/slotRepository.interface";
import { ITransactionRepository } from "domain/repositoryInterfaces/transactionRepository.interface";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IWalletRepository } from "domain/repositoryInterfaces/walletRepository.inteface";
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
import { RescheduleReviewRepository } from "interfaceAdapters/repositories/rescheduleReview.repository";
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

    //reschedule review
    container.register<IRescheduleReviewRepository>(
      "IRescheduleReviewRepository",
      {
        useClass: RescheduleReviewRepository,
      }
    );
  }
}
