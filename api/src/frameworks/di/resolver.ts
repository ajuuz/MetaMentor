import {AuthController} from "interfaceAdapters/controllers/auth/auth.controller";
import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { IAuthController } from "entities/controllerInterfaces/auth/authController.interface";
import { ErrorMiddleware } from "interfaceAdapters/middlewares/error.middleware";
import { IAdminStudentController} from "entities/controllerInterfaces/admin/adminStudentController.interface";
import { AdminStudentController} from "interfaceAdapters/controllers/admin/student.controller";
import { ICommonController } from "entities/controllerInterfaces/common/commonController.interface";
import { CommonController } from "interfaceAdapters/controllers/common/common.controller";
import { IMentorController } from "entities/controllerInterfaces/mentor/mentorController.interface";
import { MentorController } from "interfaceAdapters/controllers/mentor/mentor.controller";
import { IAdminMentorController } from "entities/controllerInterfaces/admin/adminMentorController.interface";
import { AdminMentorController } from "interfaceAdapters/controllers/admin/mentor.controller";
import { IErrorMiddleware } from "entities/middlewareInterfaces/error-middleware.interface";
import { IAuthMiddleware } from "entities/middlewareInterfaces/authMiddleware.interface";
import { AuthMiddleware } from "interfaceAdapters/middlewares/auth.middleware";
import { IUserController } from "entities/controllerInterfaces/user/userController.interface";
import { UserController } from "interfaceAdapters/controllers/user/user.controller";
import { IAdminDomainController } from "entities/controllerInterfaces/admin/adminDomainController.interface";
import { AdminDomainController } from "interfaceAdapters/controllers/admin/domain.controller";
import { IUserDomainController } from "entities/controllerInterfaces/user/userDomainController.interface";
import { UserDomainController } from "interfaceAdapters/controllers/user/userDomain.controller";
import { IAdminCommunityController } from "entities/controllerInterfaces/admin/communityController.interface";
import { AdminCommunityController } from "interfaceAdapters/controllers/admin/community.controller";
import { IMentorSlotController } from "entities/controllerInterfaces/mentor/slotController.inteface";
import { MentorSlotController } from "interfaceAdapters/controllers/mentor/slot.controller";
import { IUserSlotController } from "entities/controllerInterfaces/user/userSlotController.interface";
import { UserSlotController } from "interfaceAdapters/controllers/user/userSlot.controller";
import { IPaymentController } from "entities/controllerInterfaces/payment/paymentController";
import { PaymentController } from "interfaceAdapters/controllers/payment/payment.controller";

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

//paymentController
export const paymentController = container.resolve<IPaymentController>(PaymentController)


//middleware
export const errorMiddleware = container.resolve<IErrorMiddleware>(ErrorMiddleware)
export const authMiddleware = container.resolve<IAuthMiddleware>(AuthMiddleware)


