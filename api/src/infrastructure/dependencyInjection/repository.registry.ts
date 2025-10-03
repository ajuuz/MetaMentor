import { IBlackListTokenRepository } from "domain/repositoryInterfaces/blackListTokenRepository.interface";
import { ICommentRepository } from "domain/repositoryInterfaces/commentRepository.interface";
import { ICommunityChatRepository } from "domain/repositoryInterfaces/communityChatRepository.interface";
import { ICommunityPostLikeRepository } from "domain/repositoryInterfaces/communityPostLikeRepository.interface";
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

import { BlackListTokenRepository } from "infrastructure/repository/blackListToken.repository";
import { CommentRepository } from "infrastructure/repository/comment.repository";
import { CommunityRepository } from "infrastructure/repository/community.repository";
import { CommunityChatRepository } from "infrastructure/repository/communityChat.repository";
import { CommunityPostRepository } from "infrastructure/repository/communityPost.repository";
import { CommunityPostLikeRepository } from "infrastructure/repository/communityPostLike.repository";
import { DomainRepository } from "infrastructure/repository/domain.repository";
import { EnrolledLevelRepository } from "infrastructure/repository/enrolledLevel.repository";
import { FcmTokenRepository } from "infrastructure/repository/fcmToken.repository";
import { LevelRepository } from "infrastructure/repository/level.repository";
import { MentorRepository } from "infrastructure/repository/mentor.repository";
import { NotificationRepository } from "infrastructure/repository/notification.repository";
import { OtpRepository } from "infrastructure/repository/otp.repository";
import { RescheduleReviewRepository } from "infrastructure/repository/rescheduleReview.repository";
import { ReviewRepository } from "infrastructure/repository/review.repository";
import { SequenceNumberRepository } from "infrastructure/repository/sequenceNumber.repository";
import { SlotRepository } from "infrastructure/repository/slot.repository";
import { SlotLockRepository } from "infrastructure/repository/slotLock.repository";
import { StudentRepository } from "infrastructure/repository/student.repository";
import { TransactionRepository } from "infrastructure/repository/transaction.repository";
import { UserRepository } from "infrastructure/repository/user.repository";
import { WalletRepository } from "infrastructure/repository/wallet.repository";
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
    container.register<ICommunityPostLikeRepository>("ICommunityPostLikeRepository", {
      useClass: CommunityPostLikeRepository,
    });
    container.register<ICommunityChatRepository>("ICommunityChatRepository", {
      useClass: CommunityChatRepository,
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
