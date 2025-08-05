import { IAdminDomainController } from "entities/controllerInterfaces/admin/adminDomainController.interface";
import { IAdminMentorController } from "entities/controllerInterfaces/admin/adminMentorController.interface";
import { IAdminStudentController} from "entities/controllerInterfaces/admin/adminStudentController.interface";
import { IAdminCommunityController } from "entities/controllerInterfaces/admin/communityController.interface";
import { IAuthController } from "entities/controllerInterfaces/auth/authController.interface";
import { ICommonController } from "entities/controllerInterfaces/common/commonController.interface";
import { IMentorController } from "entities/controllerInterfaces/mentor/mentorController.interface";
import { IMentorSlotController } from "entities/controllerInterfaces/mentor/slotController.inteface";
import { IPaymentController } from "entities/controllerInterfaces/payment/paymentController";
import { IUserController } from "entities/controllerInterfaces/user/userController.interface";
import { IUserDomainController } from "entities/controllerInterfaces/user/userDomainController.interface";
import { IUserReviewController } from "entities/controllerInterfaces/user/userReviewController.interface";
import { IUserSlotController } from "entities/controllerInterfaces/user/userSlotController.interface";
import { IAuthMiddleware } from "entities/middlewareInterfaces/authMiddleware.interface";
import { IErrorMiddleware } from "entities/middlewareInterfaces/error-middleware.interface";
import { AdminCommunityController } from "interfaceAdapters/controllers/admin/community.controller";
import { AdminDomainController } from "interfaceAdapters/controllers/admin/domain.controller";
import { AdminMentorController } from "interfaceAdapters/controllers/admin/mentor.controller";
import { AdminStudentController} from "interfaceAdapters/controllers/admin/student.controller";
import {AuthController} from "interfaceAdapters/controllers/auth/auth.controller";
import { CommonController } from "interfaceAdapters/controllers/common/common.controller";
import { MentorController } from "interfaceAdapters/controllers/mentor/mentor.controller";
import { MentorSlotController } from "interfaceAdapters/controllers/mentor/slot.controller";
import { PaymentController } from "interfaceAdapters/controllers/payment/payment.controller";
import { UserController } from "interfaceAdapters/controllers/user/user.controller";
import { UserDomainController } from "interfaceAdapters/controllers/user/userDomain.controller";
import { UserReviewController } from "interfaceAdapters/controllers/user/userReview.controller";
import { UserSlotController } from "interfaceAdapters/controllers/user/userSlot.controller";
import { AuthMiddleware } from "interfaceAdapters/middlewares/auth.middleware";
import { ErrorMiddleware } from "interfaceAdapters/middlewares/error.middleware";
import { container } from "tsyringe";

import { DependencyInjection } from ".";
import { ILoggerMiddleware } from "entities/middlewareInterfaces/loggerMiddleware.interface";
import { LoggerMiddleware } from "interfaceAdapters/middlewares/logger.middleware";

DependencyInjection.registerAll()

//authControllers
export const authController = container.resolve<IAuthController>(AuthController)


//adminControllers
export const adminStudentController = container.resolve<IAdminStudentController>(AdminStudentController)
export const adminMentorController = container.resolve<IAdminMentorController>(AdminMentorController);
export const adminDomainController = container.resolve<IAdminDomainController>(AdminDomainController);
export const adminCommunityController = container.resolve<IAdminCommunityController>(AdminCommunityController);

//commomController
export const commonController = container.resolve<ICommonController>(CommonController)

//MentorController
export const mentorController = container.resolve<IMentorController>(MentorController)
export const mentorSlotController = container.resolve<IMentorSlotController>(MentorSlotController)

//studentController
export const userController = container.resolve<IUserController>(UserController)
export const userDomainController = container.resolve<IUserDomainController>(UserDomainController)
export const userSlotController = container.resolve<IUserSlotController>(UserSlotController)
export const userReviewController = container.resolve<IUserReviewController>(UserReviewController)

//paymentController
export const paymentController = container.resolve<IPaymentController>(PaymentController)


//middleware
export const errorMiddleware = container.resolve<IErrorMiddleware>(ErrorMiddleware)
export const authMiddleware = container.resolve<IAuthMiddleware>(AuthMiddleware)
export const loggerMiddleware = container.resolve<ILoggerMiddleware>(LoggerMiddleware)


