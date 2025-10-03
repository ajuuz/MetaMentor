import { IAdminDomainController } from "application/interfaces/controller/admin/adminDomainController.interface";
import { IAdminMentorController } from "application/interfaces/controller/admin/adminMentorController.interface";
import { IAdminStudentController } from "application/interfaces/controller/admin/adminStudentController.interface";
import { IAdminCommunityController } from "application/interfaces/controller/admin/communityController.interface";
import { IAdminLevelController } from "application/interfaces/controller/admin/levelController.interface";
import { IAdminReviewController } from "application/interfaces/controller/admin/reviewController.interface";
import { IAuthController } from "application/interfaces/controller/auth/authController.interface";
import { ICommonController } from "application/interfaces/controller/common/commonController.interface";
import { ICommonDomainController } from "application/interfaces/controller/common/domainController.interface";
import { IFcmTokenController } from "application/interfaces/controller/common/fcmTokenController.interface";
import { IMentorController } from "application/interfaces/controller/mentor/mentorController.interface";
import { IMentorReviewController } from "application/interfaces/controller/mentor/reviewController.interface";
import { IMentorSlotController } from "application/interfaces/controller/mentor/slotController.inteface";
import { IPaymentController } from "application/interfaces/controller/payment/paymentController";
import { IUserCommunityController } from "application/interfaces/controller/user/communityController.interface";
import { IUserCommunityPostController } from "application/interfaces/controller/user/communityPostController.interface";
import { IUserEnrolledLevelController } from "application/interfaces/controller/user/enrolledLevelController.interface";
import { IUserMentorController } from "application/interfaces/controller/user/mentorController.interface";
import { IUserNotificationController } from "application/interfaces/controller/user/notificationController.interface";
import { IUserRescheduledReviewController } from "application/interfaces/controller/user/rescheduledReviewController.interface";
import { IUserController } from "application/interfaces/controller/user/userController.interface";
import { IUserDomainController } from "application/interfaces/controller/user/userDomainController.interface";
import { IUserReviewController } from "application/interfaces/controller/user/userReviewController.interface";
import { IUserSlotController } from "application/interfaces/controller/user/userSlotController.interface";
import { IAuthMiddleware } from "application/interfaces/middleware/authMiddleware.interface";
import { IErrorMiddleware } from "application/interfaces/middleware/error-middleware.interface";
import { ILoggerMiddleware } from "application/interfaces/middleware/loggerMiddleware.interface";
import { AdminCommunityController } from "presentation/controller/admin/community.controller";
import { AdminDomainController } from "presentation/controller/admin/domain.controller";
import { AdminLevelController } from "presentation/controller/admin/level.controller";
import { AdminMentorController } from "presentation/controller/admin/mentor.controller";
import { AdminReviewController } from "presentation/controller/admin/review.controller";
import { AdminStudentController } from "presentation/controller/admin/student.controller";
import { AuthController } from "presentation/controller/auth/auth.controller";
import { CommonController } from "presentation/controller/common/common.controller";
import { CommonDomainController } from "presentation/controller/common/domain.controller";
import { FcmTokenController } from "presentation/controller/common/fcmToken.controller";
import { MentorController } from "presentation/controller/mentor/mentor.controller";
import { MentorReviewController } from "presentation/controller/mentor/review.controller";
import { MentorSlotController } from "presentation/controller/mentor/slot.controller";
import { PaymentController } from "presentation/controller/payment/payment.controller";
import { UserCommunityController } from "presentation/controller/user/community.controller";
import { UserCommunityPostController } from "presentation/controller/user/communityPost.controller";
import { UserDomainController } from "presentation/controller/user/domain.controller";
import { UserEnrolledLevelController } from "presentation/controller/user/enrolledLevel.controller";
import { UserMentorController } from "presentation/controller/user/mentor.controller";
import { UserNotificationController } from "presentation/controller/user/notification.controller";
import { UserRescheduledReviewController } from "presentation/controller/user/rescheduledReview.controller";
import { UserReviewController } from "presentation/controller/user/review.controller";
import { UserSlotController } from "presentation/controller/user/slot.controller";
import { UserController } from "presentation/controller/user/user.controller";
import { AuthMiddleware } from "presentation/middleware/auth.middleware";
import { ErrorMiddleware } from "presentation/middleware/error.middleware";
import { LoggerMiddleware } from "presentation/middleware/logger.middleware";
import { container } from "tsyringe";

import { DependencyInjection } from ".";


DependencyInjection.registerAll();

//authControllers
export const authController =
  container.resolve<IAuthController>(AuthController);

//adminControllers
export const adminStudentController =
  container.resolve<IAdminStudentController>(AdminStudentController);
export const adminMentorController = container.resolve<IAdminMentorController>(
  AdminMentorController
);
export const adminDomainController = container.resolve<IAdminDomainController>(
  AdminDomainController
);
export const adminLevelController =
  container.resolve<IAdminLevelController>(AdminLevelController);
export const adminCommunityController =
  container.resolve<IAdminCommunityController>(AdminCommunityController);
export const adminReviewController = container.resolve<IAdminReviewController>(
  AdminReviewController
);

//MentorController
export const mentorController =
  container.resolve<IMentorController>(MentorController);
export const mentorSlotController =
  container.resolve<IMentorSlotController>(MentorSlotController);
export const mentorReviewController =
  container.resolve<IMentorReviewController>(MentorReviewController);

//studentController
export const userController =
  container.resolve<IUserController>(UserController);
export const userDomainController =
  container.resolve<IUserDomainController>(UserDomainController);
export const userMentorController =
  container.resolve<IUserMentorController>(UserMentorController);
export const userSlotController =
  container.resolve<IUserSlotController>(UserSlotController);
export const userReviewController =
  container.resolve<IUserReviewController>(UserReviewController);
export const userCommunityController =
  container.resolve<IUserCommunityController>(UserCommunityController);
export const userEnrolledLevelController =
  container.resolve<IUserEnrolledLevelController>(UserEnrolledLevelController);
export const userNotificationController =
  container.resolve<IUserNotificationController>(UserNotificationController);
export const userRescheduledReviewController =
  container.resolve<IUserRescheduledReviewController>(
    UserRescheduledReviewController
  );
export const userCommunityPostController =
  container.resolve<IUserCommunityPostController>(UserCommunityPostController);

//paymentController
export const paymentController =
  container.resolve<IPaymentController>(PaymentController);

//commomController
export const commonController =
  container.resolve<ICommonController>(CommonController);
export const fcmTokenController =
  container.resolve<IFcmTokenController>(FcmTokenController);
export const commonDomainController =
  container.resolve<ICommonDomainController>(CommonDomainController);

//middleware
export const errorMiddleware =
  container.resolve<IErrorMiddleware>(ErrorMiddleware);
export const authMiddleware =
  container.resolve<IAuthMiddleware>(AuthMiddleware);
export const loggerMiddleware =
  container.resolve<ILoggerMiddleware>(LoggerMiddleware);
