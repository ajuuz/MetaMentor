import {AuthController} from "interfaceAdapters/controllers/auth/auth.controller";
import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { IAuthController } from "entities/controllerInterfaces/auth/authController.interface";
import { ErrorMiddleware } from "interfaceAdapters/middlewares/error.middleware";
import { IAdminStudentController} from "entities/controllerInterfaces/admin/student-controller.interface";
import { AdminStudentController} from "interfaceAdapters/controllers/admin/studentController";
import { ICommonController } from "entities/controllerInterfaces/common/commonController.interface";
import { CommonController } from "interfaceAdapters/controllers/common/commonController";
import { IMentorController } from "entities/controllerInterfaces/mentor/registerController.interface";
import { MentorController } from "interfaceAdapters/controllers/mentor/mentorController";
import { IAdminMentorController } from "entities/controllerInterfaces/admin/adminMentorController.interface";
import { AdminMentorController } from "interfaceAdapters/controllers/admin/mentorController";
import { IErrorMiddleware } from "entities/middlewareInterfaces/error-middleware.interface";
import { IAuthMiddleware } from "entities/middlewareInterfaces/authMiddleware.interface";
import { AuthMiddleware } from "interfaceAdapters/middlewares/auth.middleware";
import { IUserController } from "entities/controllerInterfaces/user/userController.interface";
import { UserController } from "interfaceAdapters/controllers/user/userController";

DependencyInjection.registerAll()

//authControllers
export const authController = container.resolve<IAuthController>(AuthController)


//adminControllers
export const adminStudentController = container.resolve<IAdminStudentController>(AdminStudentController)
export const adminMentorController = container.resolve<IAdminMentorController>(AdminMentorController);

//commomController
export const commonController = container.resolve<ICommonController>(CommonController)

//MentorController
export const mentorController = container.resolve<IMentorController>(MentorController)


//studentController
export const userController = container.resolve<IUserController>(UserController)


//middleware
export const errorMiddleware = container.resolve<IErrorMiddleware>(ErrorMiddleware)
export const authMiddleware = container.resolve<IAuthMiddleware>(AuthMiddleware)