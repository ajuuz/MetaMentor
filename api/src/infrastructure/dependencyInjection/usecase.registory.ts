import { IForgotPasswordSendMailUsecase } from "application/usecase/interfaces/auth/forgotPasswordMailUsecase.interface";
import { IForgotPasswordResetUsecase } from "application/usecase/interfaces/auth/forgotPasswordResetUsecase.interface";
import { IGoogleAuthUsecase } from "application/usecase/interfaces/auth/googleAuthUsecase.interface";
import { ILoginUsecase } from "application/usecase/interfaces/auth/loginUsecase.interface";
import { IRegisterUserUsecase } from "application/usecase/interfaces/auth/registerUsecase.interface";
import { IResendOtpUsecase } from "application/usecase/interfaces/auth/resendOtpUsecase.interface";
import { ITokenRefreshingUsecase } from "application/usecase/interfaces/auth/tokenRefreshing.interface";
import { IVerifyOtpUsecase } from "application/usecase/interfaces/auth/verifyOtpUsecase.interface";
import { IUploadImageUsecase } from "application/usecase/interfaces/common/uploadImageUsecase.interface";
import { IAddCommunityUsecase } from "application/usecase/interfaces/community/addCommunityUsecase.interface";
import { IGetCommunitiesUsecase } from "application/usecase/interfaces/community/getCommunitiesUsecase.interface";
import { IUpdateCommunityStatusUsecase } from "application/usecase/interfaces/community/updateCommunityUsecase.interface";
import { IAddDomainUsecase } from "application/usecase/interfaces/domain/addDomainUsecase.interface";
import { IEnrollDomainUsecase } from "application/usecase/interfaces/domain/enrollDomainUsecase.interface";
import { IGetEnrolledDomainsUsecase } from "application/usecase/interfaces/domain/getDomainDashboardUsecase.interface";
import { IGetDomainInsightUsecase } from "application/usecase/interfaces/domain/getDomainInsightUsecase.interface";
import { IGetAllDomainsNameAndIdUsecase } from "application/usecase/interfaces/domain/getDomainsNameAndIdUsecase.interface";
import { IGetAllDomainsUsecase } from "application/usecase/interfaces/domain/getDomainUsecase.interface";
import { IGetSpecificDomainUsecase } from "application/usecase/interfaces/domain/getSpecificDomainUsecase.interface";
import { IGetUnblockedDomainsUsecase } from "application/usecase/interfaces/domain/getUnblockedDomainsUsecase.interface";
import { IUpdateDomainStatusUsecase } from "application/usecase/interfaces/domain/updateDomainStatusUsecase.interface";
import { IAcceptMentorApplicationUsecase } from "application/usecase/interfaces/mentor/acceptMentorApplicationUsecase.interface";
import { IGetMentorsForStudUsecase } from "application/usecase/interfaces/mentor/getMentorsForStudUsecase.interface";
import { IGetMentorApplicationDetailsUsecase } from "application/usecase/interfaces/mentor/getMentorApplicationDetailsUsecase.interface";
import { ICreateMentorApplicationUsecase } from "application/usecase/interfaces/mentor/createMentorApplicationUsecase.interface";
import { IRejectMentorApplicationUsecase } from "application/usecase/interfaces/mentor/rejectMentorApplication.interface";
import { IUpdateMentorStatusUsecase } from "application/usecase/interfaces/mentor/updateMentorStatusUsecase.interface";
import { ICreateNotificationUsecase } from "application/usecase/interfaces/notification/createNotificationUsecase.interface";
import { ICreateOrderUsecase } from "application/usecase/interfaces/payment/createOrderUsecase.interface";
import { IVerifyPaymentUsecase } from "application/usecase/interfaces/payment/verifyPaymentUsecase.interface";
import { IBookReviewUsecase } from "application/usecase/interfaces/review/bookReviewUsecase.interface";
import { IGetMentorReviewsUsecase } from "application/usecase/interfaces/review/getReviewsForMentorUsecase.interface";
import { IGetReviewForMentorUsecase } from "application/usecase/interfaces/review/getReviewForMentorUsecase.interface";
import { ISubmitReviewResultUsecase } from "application/usecase/interfaces/review/submitReviewFeedBackUsecase.interface";
import { ICancelReviewByMentorUsecase } from "application/usecase/interfaces/review/cancelReviewByMentorUsecase.interface";
import { IGetDomainSlotsUsecase } from "application/usecase/interfaces/slot/getDomainSlotsUsecase.interface";
import { IGetMentorSlotsUsecase } from "application/usecase/interfaces/slot/getMentorSlotsUsecase.interface";
import { ISlotValidityCheckerUsecase } from "application/usecase/interfaces/slot/slotValidityCheckerUsecase.interface";
import { IUpdateSlotStatusUsecase } from "application/usecase/interfaces/slot/updateSlotStatusUsecase.interface";
import { IUpdateSlotUsecase } from "application/usecase/interfaces/slot/updateSlotUsecase.interface";
import { IGetAllStudentsUsecase } from "application/usecase/interfaces/student/getAllStudentsUsecase.interface";
import { IUpdateStudentStatusUsecase } from "application/usecase/interfaces/student/updateStudentStatusUsecase.interface";
import { ICreateTransactionUsecase } from "application/usecase/interfaces/transaction/createTransactionUsecase.interface";
import { IGetSpecificUserUsecase } from "application/usecase/interfaces/user/getSpecificUserUsecase.interface";
import { IUpdateUserUsecase } from "application/usecase/interfaces/user/updateUserUsecase.interface";
import { ICreditWalletUsecase } from "application/usecase/interfaces/wallet/creditWalletUsecase.inteface";
import { container } from "tsyringe";
import { ForgotPasswordSendMailUsecase } from "application/usecase/implementations/auth/forgotPasswordMail.usecase";
import { ForgotPasswordResetUsecase } from "application/usecase/implementations/auth/forgotPasswordReset.usecase";
import { GoogleAuthUsecase } from "application/usecase/implementations/auth/googleAuth.usecase";
import { LoginUsecase } from "application/usecase/implementations/auth/login.usecase";
import { RegisterUserUsecase } from "application/usecase/implementations/auth/registerUser.usecase";
import { ResendOtpUsecase } from "application/usecase/implementations/auth/resendOtp.usecase";
import { TokenRefreshingUsecase } from "application/usecase/implementations/auth/tokenRefreshing.usecase";
import { VerifyOtpUsecase } from "application/usecase/implementations/auth/verifyOtp.usecase";
import { UploadImageUsecase } from "application/usecase/implementations/common/uploadImageUsecase";
import { AddCommunityUsecase } from "application/usecase/implementations/community/addCommunity.usecase";
import { GetCommunitiesUsecase } from "application/usecase/implementations/community/getCommunities.usecase";
import { UpdateCommunityStatusUsecase } from "application/usecase/implementations/community/updateCommunityStatus.usecase";
import { AddDomainUsecase } from "application/usecase/implementations/domain/addDomain.usecase";
import { EnrollDomainUsecase } from "application/usecase/implementations/domain/enrollDomain.usecase";
import { GetAllDomainsUsecase } from "application/usecase/implementations/domain/getAllDomain.usecase";
import { GetDomainInsightUsecase } from "application/usecase/implementations/domain/getDomainInsight.usecase";
import { GetAllDomainsNameAndIdUsecase } from "application/usecase/implementations/domain/getDomainsNameAndId.usecase";
import { GetEnrolledDomainsUsecase } from "application/usecase/implementations/domain/getEnrolledDomains.usecase";
import { GetSpecificDomainUsecase } from "application/usecase/implementations/domain/getSpecificDomain.usecase";
import { GetUnblockedDomainsUsecase } from "application/usecase/implementations/domain/getUnblockedDomains.usecase";
import { UpdateDomainStatusUsecase } from "application/usecase/implementations/domain/updateDomainStatus.usecase";
import { AcceptMentorApplicationUsecase } from "application/usecase/implementations/mentor/acceptMentorApplication.usecase";
import { GetMentorsForStudUsecase } from "application/usecase/implementations/mentor/getMentorsForStud.usecase";
import { GetMentorApplicationDetailsUsecase } from "application/usecase/implementations/mentor/getMentorApplicationDetails.usecase";
import { CreateMentorApplicationUsecase } from "application/usecase/implementations/mentor/createMentorApplication.usecase";
import { RejectMentorApplicationUsecase } from "application/usecase/implementations/mentor/rejectMentorApplication.usecase";
import { UpdateMentorStatusUsecase } from "application/usecase/implementations/mentor/updateMentorStatus.usecase";
import { CreateNotificationUsecase } from "application/usecase/implementations/notification/createNotification.usecase";
import { CreateOrderUsecase } from "application/usecase/implementations/payment/createOrder.usecase";
import { VerifyPaymentUsecase } from "application/usecase/implementations/payment/verifyPayment.usecase";
import { BookReviewUsecase } from "application/usecase/implementations/review/bookReview.usecase";
import { GetMentorReviewsUsecase } from "application/usecase/implementations/review/getReviewsForMentor.usecase";
import { GetReviewForMentorUsecase } from "application/usecase/implementations/review/getReviewForMentor.usecase";
import { CancelReviewByMentorUsecase } from "application/usecase/implementations/review/cancelReviewByMentor.usecase";
import { GetDomainSlotsUsecase } from "application/usecase/implementations/slot/getDomainSlots.usecase";
import { GetMentorSlotsUsecase } from "application/usecase/implementations/slot/getMentorSlots.usecase";
import { SlotValidityCheckerUsecase } from "application/usecase/implementations/slot/slotValidityChecker.usecase";
import { UpdateSlotUsecase } from "application/usecase/implementations/slot/updateSlot.usecase";
import { UpdateSlotStatusUsecase } from "application/usecase/implementations/slot/updateSlotStatus.usecase";
import { GetAllStudentsUsecase } from "application/usecase/implementations/student/getAllStudentsUsecase";
import { UpdateStudentStatusUsecase } from "application/usecase/implementations/student/updateStudentStatusUsecase";
import { CreateTransactionUsecase } from "application/usecase/implementations/transaction/createTransaction.usecase";
import { GetSpecificUserUsecase } from "application/usecase/implementations/user/getSpecificUser.usecase";
import { UpdateUserUsecase } from "application/usecase/implementations/user/updateUser.usecase";
import { CreditWalletUsecase } from "application/usecase/implementations/wallet/creditWallet.usecase";
import { IDebitWalletUsecase } from "application/usecase/interfaces/wallet/debitWalletUsecase.interface";
import { DebitWalletUsecase } from "application/usecase/implementations/wallet/debitWallet.usecase";
import { ILogoutUsecase } from "application/usecase/interfaces/auth/logoutUsecase.interface";
import { LogoutUsecase } from "application/usecase/implementations/auth/logout.usecase";
import { IGetReviewsForStudentUsecase } from "application/usecase/interfaces/review/getReviewsForStudentUsecase.interface";
import { GetReviewsForStudentUsecase } from "application/usecase/implementations/review/getReviewsForStudent.usecase";
import { SubmitReviewResultUsecase } from "application/usecase/implementations/review/submitReviewResult.usecase";
import { ICancelReviewByStudentUsecase } from "application/usecase/interfaces/review/cancelReviewByStudentUsecase.interface";
import { CancelReviewByStudentUsecase } from "application/usecase/implementations/review/cancelReviewByStudent.usecase";
import { IGetEnrolledCommunitiesUsecase } from "application/usecase/interfaces/community/getEnrolledCommunitiesUsecase.interface";
import { GetEnrolledCommunitiesUsecase } from "application/usecase/implementations/community/getEnrolledCommunities.usecase";
import { ISaveFcmTokenUsecase } from "application/usecase/interfaces/fcmToken/saveFcmTokenUsecase.interface";
import { SaveFcmTokenUsecase } from "application/usecase/implementations/fcmToken/saveFcmToken.usecase";
import { IGetSlotsForStudUsecase } from "application/usecase/interfaces/slot/getSlotsForStudUsecase.interface";
import { GetSlotsForStudUsecase } from "application/usecase/implementations/slot/getSlotsForStud.usecase";
import { IGetReviewByDayForStudUsecase } from "application/usecase/interfaces/review/getReviewByDayForStudUsecase.interface";
import { GetReviewByDayForStudUsecase } from "application/usecase/implementations/review/getReviewByDayForStud.usecase";
import { IGetMentorsUsecase } from "application/usecase/interfaces/mentor/getMentorsUsecase.interface";
import { GetMentorsUsecase } from "application/usecase/implementations/mentor/getMentors.usecase";
import { GetMentorsForAdminUsecase } from "application/usecase/implementations/mentor/getMentorsForAdmin.usecase";
import { IGetMentorsForAdminUsecase } from "application/usecase/interfaces/mentor/getMentorsForAdmin.interface";
import { UpdateMentorApplicationUsecase } from "application/usecase/implementations/mentor/updateMentorApplication.usecase";
import { IUpdateMentorApplicationUsecase } from "application/usecase/interfaces/mentor/updateMentorApplicationUsecase.interface";
import { IGetProfessionalDetailsUsecase } from "application/usecase/interfaces/mentor/getProfessionalDetailsUsecase.interface";
import { GetProfessionalDetailsUsecase } from "application/usecase/implementations/mentor/getProfessionalDetails.usecase";
import { IEditDomainUsecase } from "application/usecase/interfaces/domain/editDomainUsecase";
import { EditDomainUsecase } from "application/usecase/implementations/domain/editDomain.usecase";
import { IUpdateLevelStatusUsecase } from "application/usecase/interfaces/level/updateLevelStatusUsecase.interface";
import { UpdateLevelStatusUsecase } from "application/usecase/implementations/level/updateLevelStatus.usecase";
import { ISaveLevelAssignmentUsecase } from "application/usecase/interfaces/enrolledLevel/saveLevelAssignmentUsecase.interface";
import { SaveLevelAssignmentUsecase } from "application/usecase/implementations/enrolledLevel/saveLevelAssignment.usecase";
import { IRescheduleReviewByStudentUsecase } from "application/usecase/interfaces/review/rescheduleReviewByStudentUsecase.interface";
import { RescheduleReviewByStudentUsecase } from "application/usecase/implementations/review/rescheduleReviewByStudent.usecase";
import { IGetNotificationUsecase } from "application/usecase/interfaces/notification/getNotificationUsecase.interface";
import { GetNotificationUsecase } from "application/usecase/implementations/notification/getNotifications.usecase";
import { IMarkAsReadUsecase } from "application/usecase/interfaces/notification/markAsReadUsecase.interface";
import { MarkAsReadUsecase } from "application/usecase/implementations/notification/markAsRead.usecase";
import { IGetRescheduledReviewUsecase } from "application/usecase/interfaces/rescheduledReview/getRescheduledReviewUsecase.interface";
import { GetRescheduledReviewUsecase } from "application/usecase/implementations/rescheduledReview/getRescheduledReview.usecase";
import { IRescheduleReviewSubmitByMentor } from "application/usecase/interfaces/review/rescheduleReviewSubmitByMentorUsecase.interface";
import { RescheduleReviewSubmitByMentor } from "application/usecase/implementations/review/rescheduleReviewSubmitByMentor.usecase";
import { IGetReviewForStudentUsecase } from "application/usecase/interfaces/review/getReviewForStudentUsecase.interface";
import { GetReviewForStudentUsecase } from "application/usecase/implementations/review/getReviewForStudent.usecase";
import { IReviewCountUsecase } from "application/usecase/interfaces/review/reviewCountUsecase.interface";
import { IGetReviewGrowthUsecase } from "application/usecase/interfaces/review/getReviewGrowthUsecase.interface";
import { GetReviewGrowthUsecase } from "application/usecase/implementations/review/getReviewGrowth.usecase";
import { ReviewCountUsecase } from "application/usecase/implementations/review/reviewCount.usecase";
import { ICreateAPostUsecase } from "application/usecase/interfaces/communityPost/createAPostUsecase.interface";
import { CreateAPostUsecase } from "application/usecase/implementations/communityPost/createAPost.usecase";
import { IGetCommunityPostsUsecase } from "application/usecase/interfaces/communityPost/getCommunityPostsUsecase.interface";
import { GetCommunityPostsUsecase } from "application/usecase/implementations/communityPost/getCommunityPosts.usecase";
import { IGetCommunityChatsUsecase } from "application/usecase/interfaces/communityChat/getCommunityChatsUsecase.interface";
import { GetCommunityChatsUsecase } from "application/usecase/implementations/communityChat/getCommunityChatsUsecase.interface";
import { IManageLikeUsecase } from "application/usecase/interfaces/communityPost/manageLikeUsecase.interface";
import { ManageLikeUsecase } from "application/usecase/implementations/communityPost/manageLike.usecase";
import { IGetPostLikesUsecase } from "application/usecase/interfaces/communityPost/getPostLikesUsecase.interface";
import { GetPostLikesUsecase } from "application/usecase/implementations/communityPost/getPostLikes.usecase";

export class UseCaseRegistory {
  static registerUsecases(): void {
    //auth usecases
    container.register<IRegisterUserUsecase>("IRegisterUserUsecase", {
      useClass: RegisterUserUsecase,
    });

    container.register<IVerifyOtpUsecase>("IVerifyOtpUsecase", {
      useClass: VerifyOtpUsecase,
    });

    container.register<IResendOtpUsecase>("IResendOtpUsecase", {
      useClass: ResendOtpUsecase,
    });

    container.register<ILoginUsecase>("ILoginUsecase", {
      useClass: LoginUsecase,
    });

    container.register<IGoogleAuthUsecase>("IGoogleAuthUsecase", {
      useClass: GoogleAuthUsecase,
    });

    container.register<ILogoutUsecase>("ILogoutUsecase", {
      useClass: LogoutUsecase,
    });

    container.register<IForgotPasswordSendMailUsecase>(
      "IForgotPasswordSendMailUsecase",
      {
        useClass: ForgotPasswordSendMailUsecase,
      }
    );

    container.register<IForgotPasswordResetUsecase>(
      "IForgotPasswordResetUsecase",
      {
        useClass: ForgotPasswordResetUsecase,
      }
    );

    container.register<ITokenRefreshingUsecase>("ITokenRefreshingUsecase", {
      useClass: TokenRefreshingUsecase,
    });

    //user usecases
    container.register<IGetSpecificUserUsecase>("IGetSpecificUserUsecase", {
      useClass: GetSpecificUserUsecase,
    });

    container.register<IUpdateUserUsecase>("IUpdateUserUsecase", {
      useClass: UpdateUserUsecase,
    });

    //====================student usecases========================////////////////
    container.register<IGetAllStudentsUsecase>("IGetAllStudentsUsecase", {
      useClass: GetAllStudentsUsecase,
    });

    container.register<IUpdateStudentStatusUsecase>(
      "IUpdateStudentStatusUsecase",
      {
        useClass: UpdateStudentStatusUsecase,
      }
    );

    //////////---------------mentor usecase--------------------------////////////////////
    container.register<ICreateMentorApplicationUsecase>(
      "ICreateMentorApplicationUsecase",
      {
        useClass: CreateMentorApplicationUsecase,
      }
    );

    container.register<IGetProfessionalDetailsUsecase>(
      "IGetProfessionalDetailsUsecase",
      {
        useClass: GetProfessionalDetailsUsecase,
      }
    );

    container.register<IUpdateMentorApplicationUsecase>(
      "IUpdateMentorApplicationUsecase",
      {
        useClass: UpdateMentorApplicationUsecase,
      }
    );

    container.register<IGetMentorsForStudUsecase>("IGetMentorsForStudUsecase", {
      useClass: GetMentorsForStudUsecase,
    });

    container.register<IGetMentorsUsecase>("IGetMentorsUsecase", {
      useClass: GetMentorsUsecase,
    });

    container.register<IGetMentorsForAdminUsecase>(
      "IGetMentorsForAdminUsecase",
      {
        useClass: GetMentorsForAdminUsecase,
      }
    );

    container.register<IGetMentorApplicationDetailsUsecase>(
      "IGetMentorApplicationDetailsUsecase",
      {
        useClass: GetMentorApplicationDetailsUsecase,
      }
    );

    container.register<IAcceptMentorApplicationUsecase>(
      "IAcceptMentorApplicationUsecase",
      {
        useClass: AcceptMentorApplicationUsecase,
      }
    );

    container.register<IRejectMentorApplicationUsecase>(
      "IRejectMentorApplicationUsecase",
      {
        useClass: RejectMentorApplicationUsecase,
      }
    );

    container.register<IUpdateMentorStatusUsecase>(
      "IUpdateMentorStatusUsecase",
      {
        useClass: UpdateMentorStatusUsecase,
      }
    );

    ///////////===============domain usecase========================//////////////
    container.register<IAddDomainUsecase>("IAddDomainUsecase", {
      useClass: AddDomainUsecase,
    });

    container.register<IEditDomainUsecase>("IEditDomainUsecase", {
      useClass: EditDomainUsecase,
    });

    container.register<IGetAllDomainsUsecase>("IGetAllDomainsUsecase", {
      useClass: GetAllDomainsUsecase,
    });

    container.register<IGetUnblockedDomainsUsecase>(
      "IGetUnblockedDomainsUsecase",
      {
        useClass: GetUnblockedDomainsUsecase,
      }
    );

    container.register<IGetAllDomainsNameAndIdUsecase>(
      "IGetAllDomainsNameAndIdUsecase",
      {
        useClass: GetAllDomainsNameAndIdUsecase,
      }
    );

    container.register<IGetSpecificDomainUsecase>("IGetSpecificDomainUsecase", {
      useClass: GetSpecificDomainUsecase,
    });

    container.register<IUpdateDomainStatusUsecase>(
      "IUpdateDomainStatusUsecase",
      {
        useClass: UpdateDomainStatusUsecase,
      }
    );

    container.register<IEnrollDomainUsecase>("IEnrollDomainUsecase", {
      useClass: EnrollDomainUsecase,
    });

    container.register<IGetEnrolledDomainsUsecase>(
      "IGetEnrolledDomainsUsecase",
      {
        useClass: GetEnrolledDomainsUsecase,
      }
    );

    container.register<IGetDomainInsightUsecase>("IGetDomainInsightUsecase", {
      useClass: GetDomainInsightUsecase,
    });

    //===================levels=================================//////////////////
    container.register<IUpdateLevelStatusUsecase>("IUpdateLevelStatusUsecase", {
      useClass: UpdateLevelStatusUsecase,
    });

    /////////===================community usecase=============================//////////////
    container.register<IAddCommunityUsecase>("IAddCommunityUsecase", {
      useClass: AddCommunityUsecase,
    });
    container.register<IGetCommunitiesUsecase>("IGetCommunitiesUsecase", {
      useClass: GetCommunitiesUsecase,
    });
    container.register<IUpdateCommunityStatusUsecase>(
      "IUpdateCommunityStatusUsecase",
      {
        useClass: UpdateCommunityStatusUsecase,
      }
    );
    container.register<IGetEnrolledCommunitiesUsecase>(
      "IGetEnrolledCommunitiesUsecase",
      {
        useClass: GetEnrolledCommunitiesUsecase,
      }
    );

    //===================slots usecase==============================///////////////
    container.register<IUpdateSlotUsecase>("IUpdateSlotUsecase", {
      useClass: UpdateSlotUsecase,
    });
    container.register<IGetMentorSlotsUsecase>("IGetMentorSlotsUsecase", {
      useClass: GetMentorSlotsUsecase,
    });
    container.register<IUpdateSlotStatusUsecase>("IUpdateSlotStatusUsecase", {
      useClass: UpdateSlotStatusUsecase,
    });
    container.register<IGetDomainSlotsUsecase>("IGetDomainSlotsUsecase", {
      useClass: GetDomainSlotsUsecase,
    });
    container.register<IGetSlotsForStudUsecase>("IGetSlotsForStudUsecase", {
      useClass: GetSlotsForStudUsecase,
    });
    container.register<ISlotValidityCheckerUsecase>(
      "ISlotValidityCheckerUsecase",
      {
        useClass: SlotValidityCheckerUsecase,
      }
    );

    //===================payment usecase========================//////////////
    container.register<ICreateOrderUsecase>("ICreateOrderUsecase", {
      useClass: CreateOrderUsecase,
    });
    container.register<IVerifyPaymentUsecase>("IVerifyPaymentUsecase", {
      useClass: VerifyPaymentUsecase,
    });

    //=====================wallet usecase=======================/////////////
    container.register<ICreditWalletUsecase>("ICreditWalletUsecase", {
      useClass: CreditWalletUsecase,
    });
    container.register<IDebitWalletUsecase>("IDebitWalletUsecase", {
      useClass: DebitWalletUsecase,
    });

    //===================review usecase=====================/////////////
    container.register<IBookReviewUsecase>("IBookReviewUsecase", {
      useClass: BookReviewUsecase,
    });
    container.register<IGetMentorReviewsUsecase>("IGetMentorReviewsUsecase", {
      useClass: GetMentorReviewsUsecase,
    });
    container.register<IGetReviewForMentorUsecase>(
      "IGetReviewForMentorUsecase",
      {
        useClass: GetReviewForMentorUsecase,
      }
    );
    container.register<ISubmitReviewResultUsecase>(
      "ISubmitReviewResultUsecase",
      {
        useClass: SubmitReviewResultUsecase,
      }
    );
    container.register<ICancelReviewByMentorUsecase>(
      "ICancelReviewByMentorUsecase",
      {
        useClass: CancelReviewByMentorUsecase,
      }
    );
    container.register<IGetReviewsForStudentUsecase>(
      "IGetReviewsForStudentUsecase",
      {
        useClass: GetReviewsForStudentUsecase,
      }
    );
    container.register<IGetReviewForStudentUsecase>(
      "IGetReviewForStudentUsecase",
      {
        useClass: GetReviewForStudentUsecase,
      }
    );
    container.register<ICancelReviewByStudentUsecase>(
      "ICancelReviewByStudentUsecase",
      {
        useClass: CancelReviewByStudentUsecase,
      }
    );

    container.register<IReviewCountUsecase>("IReviewCountUsecase", {
      useClass: ReviewCountUsecase,
    });

    container.register<IGetReviewGrowthUsecase>("IGetReviewGrowthUsecase", {
      useClass: GetReviewGrowthUsecase,
    });

    //=============reschedule review=================/////////
    container.register<IRescheduleReviewByStudentUsecase>(
      "IRescheduleReviewByStudentUsecase",
      {
        useClass: RescheduleReviewByStudentUsecase,
      }
    );
    container.register<IGetReviewByDayForStudUsecase>(
      "IGetReviewByDayForStudUsecase",
      {
        useClass: GetReviewByDayForStudUsecase,
      }
    );

    container.register<IGetRescheduledReviewUsecase>(
      "IGetRescheduledReviewUsecase",
      {
        useClass: GetRescheduledReviewUsecase,
      }
    );

    //==========================transaction usecase=======================////////////////
    container.register<ICreateTransactionUsecase>("ICreateTransactionUsecase", {
      useClass: CreateTransactionUsecase,
    });

    //=========================notification usecase====================//////////////
    container.register<ICreateNotificationUsecase>(
      "ICreateNotificationUsecase",
      {
        useClass: CreateNotificationUsecase,
      }
    );
    container.register<IGetNotificationUsecase>("IGetNotificationUsecase", {
      useClass: GetNotificationUsecase,
    });
    container.register<IMarkAsReadUsecase>("IMarkAsReadUsecase", {
      useClass: MarkAsReadUsecase,
    });

    //==================fcmToken usecase===========================//////////////
    container.register<ISaveFcmTokenUsecase>("ISaveFcmTokenUsecase", {
      useClass: SaveFcmTokenUsecase,
    });

    //======================enrolled Level=======================///////////////
    container.register<ISaveLevelAssignmentUsecase>(
      "ISaveLevelAssignmentUsecase",
      {
        useClass: SaveLevelAssignmentUsecase,
      }
    );

    container.register<IRescheduleReviewSubmitByMentor>(
      "IRescheduleReviewSubmitByMentor",
      {
        useClass: RescheduleReviewSubmitByMentor,
      }
    );

    container.register<ICreateAPostUsecase>("ICreateAPostUsecase", {
      useClass: CreateAPostUsecase,
    });
    container.register<IGetCommunityPostsUsecase>("IGetCommunityPostsUsecase", {
      useClass: GetCommunityPostsUsecase,
    });
    container.register<IManageLikeUsecase>("IManageLikeUsecase", {
      useClass: ManageLikeUsecase,
    });
    container.register<IGetPostLikesUsecase>("IGetPostLikesUsecase", {
      useClass: GetPostLikesUsecase,
    });
    container.register<IGetCommunityChatsUsecase>("IGetCommunityChatsUsecase", {
      useClass: GetCommunityChatsUsecase,
    });

    //========================common usecase================/////////////
    container.register<IUploadImageUsecase>("IUploadImageUsecase", {
      useClass: UploadImageUsecase,
    });
  }
}
