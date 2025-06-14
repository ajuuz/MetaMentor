import { inject, injectable } from "tsyringe";
import { IRegisterUserUsecase } from "entities/usecaseInterfaces/auth/registerUsecase.interface";
import { IOtpRespository } from "entities/repositoryInterfaces/otp-repository.interface";
import { IEmailService } from "entities/serviceInterfaces/email-service.interface";
import { SignupRequestDto } from "shared/dto/authDTO";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUserEntity } from "entities/modelEntities/user-model.entity";
import {
  ISuccessResponseHandler,
  successResponseHandler,
} from "shared/utils/successResponseHandler";
import { CustomError } from "shared/utils/error/customError";
import { EVENT_EMITTER_TYPE, HTTP_STATUS } from "shared/constants";
import { hashPassword } from "shared/utils/bcryptHelper";
import { eventBus } from "shared/eventBus";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("IOtpRepository")
    private _otpRepository: IOtpRespository,

    @inject("IEmailService")
    private _emailService: IEmailService
  ) {}

  async execute(formData: SignupRequestDto): Promise<ISuccessResponseHandler> {
    const userExists: IUserEntity | null =
      await this._userRepository.findByEmail(formData.email);
    const userWithSameNumber: boolean = await this._userRepository.findBynumber(
      formData.mobileNumber
    );
    if (userWithSameNumber) {
      throw new CustomError(HTTP_STATUS.CONFLICT, "User already exists");
    }

    if (userExists && userExists.isVerified) {
      throw new CustomError(HTTP_STATUS.CONFLICT, "User already exists");
    }

    const otpExists = await this._otpRepository.getOtp(formData.email);
    if (otpExists) {
      await this._otpRepository.deleteOtp(formData.email);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const asyncOperations = [];

    asyncOperations.push(this._otpRepository.saveOtp(formData.email, otp));

    const html =`
              <div style="max-width: 500px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px; background-color: #f9f9f9; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                <h2 style="text-align: center; color: #333;">🔐 OTP Verification</h2>
                <p style="font-size: 16px; color: #555;">Hi there,</p>
                <p style="font-size: 16px; color: #555;">Use the following OTP to complete your signup process:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <span style="display: inline-block; font-size: 24px; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; letter-spacing: 3px;">${otp}</span>
                </div>
                <p style="font-size: 14px; color: #888;">⚠️ This code is valid for 3 minutes. Please do not share it with anyone.</p>
                <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">— Meta Mentor Team</p>
              </div>
            `;


    if (!userExists) {
      const password = formData.password;
      const hashedPassword = await hashPassword(password);
      formData.password=hashedPassword
      asyncOperations.push(this._userRepository.createUser(formData));
    }
    await Promise.all(asyncOperations);
    eventBus.emit(EVENT_EMITTER_TYPE.SENDMAIL,formData.email,"Account creation",html)

    return userExists
      ? successResponseHandler(
          true,
          202,
          `Account has been created already. please verify your mail id`
        )
      : successResponseHandler(
          true,
          201,
          `OTP sent successfully to  ${formData.email}`
        );
  }
}
