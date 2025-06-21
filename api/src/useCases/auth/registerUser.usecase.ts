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
import { EVENT_EMITTER_TYPE, HTTP_STATUS, MAIL_CONTENT_PURPOSE } from "shared/constants";
import { hashPassword } from "shared/utils/bcryptHelper";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/mailContentProvider";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("IOtpRepository")
    private _otpRepository: IOtpRespository,
  ) {}

  async execute(formData: Omit<SignupRequestDto,"googleId"|"isVerified"|"profileImage">): Promise<ISuccessResponseHandler> {
    
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

    const html=mailContentProvider(MAIL_CONTENT_PURPOSE.OTP,otp)


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
