import { container } from "tsyringe";
import { IRegisterUserUsecase } from "entities/usecaseInterfaces/auth/registerUsecase.interface";
import { RegisterUserUsecase } from "useCases/auth/registerUser.usecase";
import { ILoginUsecase } from "entities/usecaseInterfaces/auth/loginUsecase.interface";
import { LoginUsecase } from "useCases/auth/login.usecase";
import { IVerifyOtpUsecase } from "entities/usecaseInterfaces/auth/verifyOtpUsecase.interface";
import { VerifyOtpUsecase } from "useCases/auth/verifyOtp.usecase";
import { GetAllStudentsUsecase } from "useCases/student/getAllStudentsUsecase";
import { IGetAllStudentsUsecase } from "entities/usecaseInterfaces/student/getAllStudentsUsecase.interface";
import { IUpdateStudentStatusUsecase } from "entities/usecaseInterfaces/student/updateStudentStatusUsecase.interface";
import { UpdateStudentStatusUsecase } from "useCases/student/updateStudentStatusUsecase";
import { IRegisterMentorUsecase } from "entities/usecaseInterfaces/mentor/registerMentorUsecase.interface";
import { RegisterMentorUsecase } from "useCases/mentor/registerMentor.usecase";
import { IGetNotVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getNotVerifiedMentorsUsecase.interface";
import { GetNotVerifiedMentorsUsecase } from "useCases/mentor/getNotVerifiedMentors.usecase";
import { IGetVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getVerifiedMentors.interface";
import { GetVerifiedMentorsUsecase } from "useCases/mentor/getVerifiedMentors.usecase";
import { IUploadImageUsecase } from "entities/usecaseInterfaces/common/uploadImageUsecase.interface";
import { UploadImageUsecase } from "useCases/common/uploadImageUsecase";
import { IGetSpecificMentorUsecase } from "entities/usecaseInterfaces/mentor/getSpecificMentorUsecase.interface";
import { GetSpecificMentorUsecase } from "useCases/mentor/getSpecificMentor.usecase";
import { IAcceptMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/acceptMentorApplicationUsecase.interface";
import { AcceptMentorApplicationUsecase } from "useCases/mentor/acceptMentorApplication.usecase";
import { IRejectMentorApplicationUsecase } from "entities/usecaseInterfaces/mentor/rejectMentorApplication.interface";
import { RejectMentorApplicationUsecase } from "useCases/mentor/rejectMentorApplication.usecase";
import { IUpdateMentorStatusUsecase } from "entities/usecaseInterfaces/mentor/updateMentorStatusUsecase.interface";
import { UpdateMentorStatusUsecase } from "useCases/mentor/updateMentorStatus.usecase";
import { ITokenRefreshingUsecase } from "entities/usecaseInterfaces/auth/tokenRefreshing.interface";
import { TokenRefreshingUsecase } from "useCases/auth/tokenRefreshing.usecase";
import { IResendOtpUsecase } from "entities/usecaseInterfaces/auth/resendOtpUsecase.interface";
import { ResendOtpUsecase } from "useCases/auth/resendOtp.usecase";
import { IForgotPasswordSendMailUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordMailUsecase.interface";
import { ForgotPasswordSendMailUsecase } from "useCases/auth/forgotPasswordMail.usecase";
import { IForgotPasswordResetUsecase } from "entities/usecaseInterfaces/auth/forgotPasswordResetUsecase.interface";
import { ForgotPasswordResetUsecase } from "useCases/auth/forgotPasswordReset.usecase";
import { IGoogleAuthUsecase } from "entities/usecaseInterfaces/auth/googleAuthUsecase.interface";
import { GoogleAuthUsecase } from "useCases/auth/googleAuth.usecase";
import { IGetSpecificUserUsecase } from "entities/usecaseInterfaces/user/getSpecificUserUsecase.interface";
import { GetSpecificUserUsecase } from "useCases/user/getSpecificUser.usecase";
import { IUpdateUserUsecase } from "entities/usecaseInterfaces/user/updateUserUsecase.interface";
import { UpdateUserUsecase } from "useCases/user/updateUser.usecase";
import { IInsertManyLevelUsecase } from "entities/usecaseInterfaces/level/insertManyLevelUsecase.interface";
import { InsertManyLevelUsecase } from "useCases/levels/insertManyLevel.usecase";
import { IAddDomainUsecase } from "entities/usecaseInterfaces/domain/addDomainUsecase.interface";
import { AddDomainUsecase } from "useCases/domain/addDomain.usecase";
import { IGetAllDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainUsecase.interface";
import { GetAllDomainsUsecase } from "useCases/domain/getAllDomain.usecase";
import { UpdateDomainStatusUsecase } from "useCases/domain/updateDomainStatus.usecase";
import { IUpdateDomainStatusUsecase } from "entities/usecaseInterfaces/domain/updateDomainStatusUsecase.interface";
import { IAddCommunityUsecase } from "entities/usecaseInterfaces/community/addCommunityUsecase.interface";
import { AddCommunityUsecase } from "useCases/community/addCommunity.usecase";
import { IGetUnblockedDomainsUsecase } from "entities/usecaseInterfaces/domain/getUnblockedDomainsUsecase.interface";
import { GetUnblockedDomainsUsecase } from "useCases/domain/getUnblockedDomains.usecase";
import { IGetAllDomainsNameAndIdUsecase } from "entities/usecaseInterfaces/domain/getDomainsNameAndIdUsecase.interface";
import { GetAllDomainsNameAndIdUsecase } from "useCases/domain/getDomainsNameAndId.usecase";
import { IGetSpecificDomainUsecase } from "entities/usecaseInterfaces/domain/getSpecificDomainUsecase.interface";
import { GetSpecificDomainUsecase } from "useCases/domain/getSpecificDomain.usecase";
import { IEnrollDomainUsecase } from "entities/usecaseInterfaces/domain/enrollDomainUsecase.interface";
import { EnrollDomainUsecase } from "useCases/domain/enrollDomain.usecase";
import { IGetEnrolledDomainsUsecase } from "entities/usecaseInterfaces/domain/getDomainDashboardUsecase.interface";
import { GetEnrolledDomainsUsecase } from "useCases/domain/getEnrolledDomains.usecase";
import { IGetCommunitiesUsecase } from "entities/usecaseInterfaces/community/getCommunitiesUsecase.interface";
import { GetCommunitiesUsecase } from "useCases/community/getCommunities.usecase";
import { IUpdateCommunityStatusUsecase } from "entities/usecaseInterfaces/community/updateCommunityUsecase.interface";
import { UpdateCommunityStatusUsecase } from "useCases/community/updateCommunityStatus.usecase";
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


        //common usecase
        container.register<IUploadImageUsecase>('IUploadImageUsecase',{
            useClass:UploadImageUsecase
        })


    }
}