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

        container.register<ITokenRefreshingUsecase>('ITokenRefreshingUsecase',{
            useClass:TokenRefreshingUsecase
        })

        // container.register<IGetLoggedInUserUsecase>('IGetLoggedInUserUsecase',{
        //     useClass:GetLoggedInUserUsecase
        // })


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



        //common usecase
        container.register<IUploadImageUsecase>('IUploadImageUsecase',{
            useClass:UploadImageUsecase
        })


    }
}