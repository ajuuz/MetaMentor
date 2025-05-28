import {AuthController} from "interfaceAdapters/controllers/auth/auth.controller";
import { container } from "tsyringe";
import { DependencyInjection } from ".";
import { IAuthController } from "entities/controllerInterfaces/user/auth-controller.interface";

DependencyInjection.registerAll()

export const authController = container.resolve<IAuthController>(AuthController)