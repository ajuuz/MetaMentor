import { IForgotPasswordSendMailUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordMailUsecase.interface";
import { IForgotPasswordResetUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordResetUsecase.interface";
import { IGoogleAuthUsecase } from "entities/usecaseInterfaces/auth/googleAuthUsecase.interface";
import { ILoginUsecase } from "entities/usecaseInterfaces/auth/loginUsecase.interface";
import { IRegisterUserUsecase } from "entities/usecaseInterfaces/auth/registerUsecase.interface";
import { IResendOtpUsecase } from "entities/usecaseInterfaces/auth/resendOtpUsecase.interface";
import { ITokenRefreshingUsecase } from "entities/usecaseInterfaces/auth/tokenRefreshing.interface";
import { IVerifyOtpUsecase } from "entities/usecaseInterfaces/auth/verifyOtpUsecase.interface";
import { IUploadImageUsecase } from "entities/usecaseInterfaces/common/uploadImageUsecase.interface";
import { IAddCommunityUsecase } from "entities/usecaseInterfaces/community/addCommunityUsecase.interface";
import { IGetCommunitiesUsecase } from "entities/usecaseInterfaces/community/getCommunitiesUsecase.interface";
import { IUpdateCommunityStatusUsecase } from "entities/usecaseInterfaces/community/updateCommunityUsecase.interface";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { IEnrollDomainUsecase } from "entities/usecaseInterfaces/domain/enrollDomainUsecase.interface";
import { IGetEnrolledDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainDashboardUsecase.interface";
import { IGetDomainInsightUsecase } from "entities/usecaseInterfaces/domain/getDomainInsightUsecase.interface";
import { IGetAllDomainsNameAndIdUsecase } from "entities/usecaseInterfaces/domain/getDomainsNameAndIdUsecase.interface";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { IGetSpecificDomainUsecase } from "entities/usecaseInterfaces/domain/getSpecificDomainUsecase.interface";
import { IGetUnblockedDomainsUsecase } from "entities/usecaseInterfaces/domain/getUnblockedDomainsUsecase.interface";
import { IUpdateDomainStatusUsecase } from "entities/usecaseInterfaces/domain/updateDomainStatusUsecase.interface";
import { IInsertManyLevelUsecase } from "entities/usecaseInterfaces/level/insertManyLevelUsecase.interface";
import { IAcceptMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/acceptMentorApplicationUsecase.interface";
import { IGetNotVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getNotVerifiedMentorsUsecase.interface";
import { IGetSpecificMentorUsecase } from "entities/usecaseInterfaces/mentor/getSpecificMentorUsecase.interface";
import { IGetVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getVerifiedMentors.interface";
import { IRegisterMentorUsecase } from "entities/usecaseInterfaces/mentor/registerMentorUsecase.interface";
import { IRejectMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/rejectMentorApplication.interface";
import { IUpdateMentorStatusUsecase } from "entities/usecaseInterfaces/mentor/updateMentorStatusUsecase.interface";
import { ICreateNotificationUsecase } from "entities/usecaseInterfaces/notification/createNotificationUsecase.interface";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/payment/createOrderUsecase.interface";
import { IVerifyPaymentUsecase } from "entities/usecaseInterfaces/payment/verifyPaymentUsecase.interface";
import { IBookReviewUsecase } from "entities/usecaseInterfaces/review/bookReviewUsecase.interface";
import { IGetMentorReviewsUsecase } from "entities/usecaseInterfaces/review/getMentorReviewsUsecase.interface";
import { IGetReviewForMentorUsecase } from "entities/usecaseInterfaces/review/getReviewForMentorUsecase.interface";
import { IGetStudentReviewsUsecase } from "entities/usecaseInterfaces/review/getStudentReviewsUsecase.interface";
import { ISubmitReviewFeedBackUsecase } from "entities/usecaseInterfaces/review/submitReviewFeedBackUsecase.interface";
import { ICancelReviewByMentorUsecase } from "entities/usecaseInterfaces/review/updateStatusByMentorUsecase.interface";
import { IGetDomainSlotsUsecase } from "entities/usecaseInterfaces/slot/getDomainSlotsUsecase.interface";
import { IGetMentorSlotsUsecase } from "entities/usecaseInterfaces/slot/getMentorSlotsUsecase.interface";
import { ISlotValidityCheckerUsecase } from "entities/usecaseInterfaces/slot/slotValidityCheckerUsecase.interface";
import { IUpdateSlotStatusUsecase } from "entities/usecaseInterfaces/slot/updateSlotStatusUsecase.interface";
import { IUpdateSlotUsecase } from "entities/usecaseInterfaces/slot/updateSlotUsecase.interface";
import { IGetAllStudentsUsecase } from "entities/usecaseInterfaces/student/getAllStudentsUsecase.interface";
import { IUpdateStudentStatusUsecase } from "entities/usecaseInterfaces/student/updateStudentStatusUsecase.interface";
import { ICreateTransactionUsecase } from "entities/usecaseInterfaces/transaction/createTransactionUsecase.interface";
import { IGetSpecificUserUsecase } from "entities/usecaseInterfaces/user/getSpecificUserUsecase.interface";
import { IUpdateUserUsecase } from "entities/usecaseInterfaces/user/updateUserUsecase.interface";
import { ICreditWalletUsecase } from "entities/usecaseInterfaces/wallet/creditWalletUsecase.inteface";
import { container } from "tsyringe";
import { ForgotPasswordSendMailUsecase } from "useCases/auth/forgotPasswordMail.usecase";
import { ForgotPasswordResetUsecase } from "useCases/auth/forgotPasswordReset.usecase";
import { GoogleAuthUsecase } from "useCases/auth/googleAuth.usecase";
import { LoginUsecase } from "useCases/auth/login.usecase";
import { RegisterUserUsecase } from "useCases/auth/registerUser.usecase";
import { ResendOtpUsecase } from "useCases/auth/resendOtp.usecase";
import { TokenRefreshingUsecase } from "useCases/auth/tokenRefreshing.usecase";
import { VerifyOtpUsecase } from "useCases/auth/verifyOtp.usecase";
import { UploadImageUsecase } from "useCases/common/uploadImageUsecase";
import { AddCommunityUsecase } from "useCases/community/addCommunity.usecase";
import { GetCommunitiesUsecase } from "useCases/community/getCommunities.usecase";
import { UpdateCommunityStatusUsecase } from "useCases/community/updateCommunityStatus.usecase";
import { AddDomainUsecase } from "useCases/domain/addDomain.usecase";
import { EnrollDomainUsecase } from "useCases/domain/enrollDomain.usecase";
import { GetAllDomainsUsecase } from "useCases/domain/getAllDomain.usecase";
import { GetDomainInsightUsecase } from "useCases/domain/getDomainInsight.usecase";
import { GetAllDomainsNameAndIdUsecase } from "useCases/domain/getDomainsNameAndId.usecase";
import { GetEnrolledDomainsUsecase } from "useCases/domain/getEnrolledDomains.usecase";
import { GetSpecificDomainUsecase } from "useCases/domain/getSpecificDomain.usecase";
import { GetUnblockedDomainsUsecase } from "useCases/domain/getUnblockedDomains.usecase";
import { UpdateDomainStatusUsecase } from "useCases/domain/updateDomainStatus.usecase";
import { InsertManyLevelUsecase } from "useCases/levels/insertManyLevel.usecase";
import { AcceptMentorApplicationUsecase } from "useCases/mentor/acceptMentorApplication.usecase";
import { GetNotVerifiedMentorsUsecase } from "useCases/mentor/getNotVerifiedMentors.usecase";
import { GetSpecificMentorUsecase } from "useCases/mentor/getSpecificMentor.usecase";
import { GetVerifiedMentorsUsecase } from "useCases/mentor/getVerifiedMentors.usecase";
import { RegisterMentorUsecase } from "useCases/mentor/registerMentor.usecase";
import { RejectMentorApplicationUsecase } from "useCases/mentor/rejectMentorApplication.usecase";
import { UpdateMentorStatusUsecase } from "useCases/mentor/updateMentorStatus.usecase";
import { CreateNotificationUsecase } from "useCases/notification/createNotification.usecase";
import { CreateOrderUsecase } from "useCases/payment/createOrder.usecase";
import { VerifyPaymentUsecase } from "useCases/payment/verifyPayment.usecase";
import { BookReviewUsecase } from "useCases/review/bookReview.usecase";
import { GetMentorReviewsUsecase } from "useCases/review/getMentorReviews.usecase";
import { GetReviewForMentorUsecase } from "useCases/review/getReviewForMentor.usecase";
import { GetStudentReviewsUsecase } from "useCases/review/getStudentReviews.usecase";

import { CancelReviewByMentorUsecase } from "useCases/review/cancelReviewByMentor.usecase";
import { GetDomainSlotsUsecase } from "useCases/slot/getDomainSlots.usecase";
import { GetMentorSlotsUsecase } from "useCases/slot/getMentorSlots.usecase";
import { SlotValidityCheckerUsecase } from "useCases/slot/slotValidityChecker.usecase";
import { UpdateSlotUsecase } from "useCases/slot/updateSlot.usecase";
import { UpdateSlotStatusUsecase } from "useCases/slot/updateSlotStatus.usecase";
import { GetAllStudentsUsecase } from "useCases/student/getAllStudentsUsecase";
import { UpdateStudentStatusUsecase } from "useCases/student/updateStudentStatusUsecase";
import { CreateTransactionUsecase } from "useCases/transaction/createTransaction.usecase";
import { GetSpecificUserUsecase } from "useCases/user/getSpecificUser.usecase";
import { UpdateUserUsecase } from "useCases/user/updateUser.usecase";
import { CreditWalletUsecase } from "useCases/wallet/creditWallet.usecase";
import { IDebitWalletUsecase } from "entities/usecaseInterfaces/wallet/debitWalletUsecase.interface";
import { DebitWalletUsecase } from "useCases/wallet/debitWallet.usecase";
import { ILogoutUsecase } from "entities/usecaseInterfaces/auth/logoutUsecase.interface";
import { LogoutUsecase } from "useCases/auth/logout.usecase";
import { IGetReviewsForStudentUsecase } from "entities/usecaseInterfaces/review/getReviewsForStudentUsecase.interface";
import { GetReviewsForStudentUsecase } from "useCases/review/getReviewsForStudent.usecase";
import { SubmitReviewFeedBackUsecase } from "useCases/review/submitReviewFeedBack.usecase";
// import { IGetLoggedInUserUsecase } from "entities/usecaseInterfaces/auth/getLoggedInUserUsecase.interface";
// import { GetLoggedInUserUsecase } from "useCases/auth/getLoggedInUser.usecase";

export class UseCaseRegistory{
    static registerUsecases():void{

        //auth usecases
        container.register<IRegisterUserUsecase>('IRegisterUserUsecase',{
            useClass:RegisterUserUsecase
        })

        container.register<IVerifyOtpUsecase>('IVerifyOtpUsecase',{
            useClass:VerifyOtpUsecase
        })

        container.register<IResendOtpUsecase>('IResendOtpUsecase',{
            useClass:ResendOtpUsecase
        })

        container.register<ILoginUsecase>('ILoginUsecase',{
            useClass:LoginUsecase
        })

        container.register<IGoogleAuthUsecase>('IGoogleAuthUsecase',{
            useClass:GoogleAuthUsecase
        })

        container.register<ILogoutUsecase>('ILogoutUsecase',{
            useClass:LogoutUsecase
        })

        container.register<IForgotPasswordSendMailUsecase>('IForgotPasswordSendMailUsecase',{
            useClass:ForgotPasswordSendMailUsecase
        })

        container.register<IForgotPasswordResetUsecase>('IForgotPasswordResetUsecase',{
            useClass:ForgotPasswordResetUsecase
        })

        container.register<ITokenRefreshingUsecase>('ITokenRefreshingUsecase',{
            useClass:TokenRefreshingUsecase
        })

        // container.register<IGetLoggedInUserUsecase>('IGetLoggedInUserUsecase',{
        //     useClass:GetLoggedInUserUsecase
        // })


        //user usecases
        container.register<IGetSpecificUserUsecase>('IGetSpecificUserUsecase',{
            useClass:GetSpecificUserUsecase
        })

        container.register<IUpdateUserUsecase>('IUpdateUserUsecase',{
            useClass:UpdateUserUsecase
        })

        //student usecases
        container.register<IGetAllStudentsUsecase>('IGetAllStudentsUsecase',{
            useClass:GetAllStudentsUsecase
        })

        container.register<IUpdateStudentStatusUsecase>('IUpdateStudentStatusUsecase',{
            useClass:UpdateStudentStatusUsecase
        })

        //mentor usecase
        container.register<IRegisterMentorUsecase>('IRegisterMentorUsecase',{
            useClass:RegisterMentorUsecase
        })
        
        container.register<IGetNotVerifiedMentorsUsecase>('IGetNotVerifiedMentorsUsecase',{
            useClass:GetNotVerifiedMentorsUsecase
        })
       
        container.register<IGetVerifiedMentorsUsecase>('IGetVerifiedMentorsUsecase',{
            useClass:GetVerifiedMentorsUsecase
        })

        container.register<IGetSpecificMentorUsecase>('IGetSpecificMentorUsecase',{
            useClass:GetSpecificMentorUsecase
        })

        container.register<IAcceptMentorApplicationUsecase>('IAcceptMentorApplicationUsecase',{
            useClass:AcceptMentorApplicationUsecase
        })

        container.register<IRejectMentorApplicationUsecase>('IRejectMentorApplicationUsecase',{
            useClass:RejectMentorApplicationUsecase
        })

        container.register<IUpdateMentorStatusUsecase>("IUpdateMentorStatusUsecase",{
            useClass:UpdateMentorStatusUsecase
        })
        
        
        //domain usecase
        container.register<IAddDomainUsecase>("IAddDomainUsecase",{
            useClass:AddDomainUsecase
        })
        container.register<IGetAllDomainsUsecase>("IGetAllDomainsUsecase",{
            useClass:GetAllDomainsUsecase
        })
        container.register<IGetUnblockedDomainsUsecase>("IGetUnblockedDomainsUsecase",{
            useClass:GetUnblockedDomainsUsecase
        })
        container.register<IGetAllDomainsNameAndIdUsecase>("IGetAllDomainsNameAndIdUsecase",{
            useClass:GetAllDomainsNameAndIdUsecase
        })
        container.register<IGetSpecificDomainUsecase>("IGetSpecificDomainUsecase",{
            useClass:GetSpecificDomainUsecase
        })
        container.register<IUpdateDomainStatusUsecase>("IUpdateDomainStatusUsecase",{
            useClass:UpdateDomainStatusUsecase
        })
        container.register<IEnrollDomainUsecase>("IEnrollDomainUsecase",{
            useClass:EnrollDomainUsecase
        })
        container.register<IGetEnrolledDomainsUsecase>("IGetEnrolledDomainsUsecase",{
            useClass:GetEnrolledDomainsUsecase
        })
        container.register<IGetDomainInsightUsecase>("IGetDomainInsightUsecase",{
            useClass:GetDomainInsightUsecase
        })

        //level usecase
        container.register<IInsertManyLevelUsecase>('IInsertManyLevelUsecase',{
            useClass:InsertManyLevelUsecase
        })

        //community usecase
        container.register<IAddCommunityUsecase>('IAddCommunityUsecase',{
            useClass:AddCommunityUsecase
        })
        container.register<IGetCommunitiesUsecase>('IGetCommunitiesUsecase',{
            useClass:GetCommunitiesUsecase
        })
        container.register<IUpdateCommunityStatusUsecase>('IUpdateCommunityStatusUsecase',{
            useClass:UpdateCommunityStatusUsecase
        })

        //slots usecase
        container.register<IUpdateSlotUsecase>('IUpdateSlotUsecase',{
            useClass:UpdateSlotUsecase
        })
        container.register<IGetMentorSlotsUsecase>('IGetMentorSlotsUsecase',{
            useClass:GetMentorSlotsUsecase
        })
        container.register<IUpdateSlotStatusUsecase>('IUpdateSlotStatusUsecase',{
            useClass:UpdateSlotStatusUsecase
        })
        container.register<IGetDomainSlotsUsecase>('IGetDomainSlotsUsecase',{
            useClass:GetDomainSlotsUsecase
        })
        container.register<ISlotValidityCheckerUsecase>('ISlotValidityCheckerUsecase',{
            useClass:SlotValidityCheckerUsecase
        })
        
        //payment usecase
        container.register<ICreateOrderUsecase>('ICreateOrderUsecase',{
            useClass:CreateOrderUsecase
        })
        container.register<IVerifyPaymentUsecase>('IVerifyPaymentUsecase',{
            useClass:VerifyPaymentUsecase
        })

        //wallet usecase
        container.register<ICreditWalletUsecase>('ICreditWalletUsecase',{
            useClass:CreditWalletUsecase
        })
        container.register<IDebitWalletUsecase>('IDebitWalletUsecase',{
            useClass:DebitWalletUsecase
        })
        
        //review usecase
        container.register<IBookReviewUsecase>('IBookReviewUsecase',{
            useClass:BookReviewUsecase
        })
        container.register<IGetStudentReviewsUsecase>('IGetStudentReviewsUsecase',{
            useClass:GetStudentReviewsUsecase
        })
        container.register<IGetMentorReviewsUsecase>('IGetMentorReviewsUsecase',{
            useClass:GetMentorReviewsUsecase
        })
        container.register<IGetReviewForMentorUsecase>('IGetReviewForMentorUsecase',{
            useClass:GetReviewForMentorUsecase
        })
        container.register<ISubmitReviewFeedBackUsecase>('ISubmitReviewFeedBackUsecase',{
            useClass:SubmitReviewFeedBackUsecase
        })
        container.register<ICancelReviewByMentorUsecase>('ICancelReviewByMentorUsecase',{
            useClass:CancelReviewByMentorUsecase
        })
        container.register<IGetReviewsForStudentUsecase>('IGetReviewsForStudentUsecase',{
            useClass:GetReviewsForStudentUsecase
        })

        //transaction usecase
        container.register<ICreateTransactionUsecase>('ICreateTransactionUsecase',{
            useClass:CreateTransactionUsecase
        })

        //notification usecase
        container.register<ICreateNotificationUsecase>('ICreateNotificationUsecase',{
            useClass:CreateNotificationUsecase
        })

        //common usecase
        container.register<IUploadImageUsecase>('IUploadImageUsecase',{
            useClass:UploadImageUsecase
        })
    }
}