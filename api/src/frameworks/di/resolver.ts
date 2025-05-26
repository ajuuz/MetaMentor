import { OtpController } from "interfaceAdapters/controllers/user/otp.controller";
import { container } from "tsyringe";
import { DependencyInjection } from ".";

DependencyInjection.registerAll()

export const otpController = container.resolve(OtpController)