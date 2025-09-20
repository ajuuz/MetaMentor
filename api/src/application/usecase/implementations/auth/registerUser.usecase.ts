import { IUserEntity } from "domain/entities/user-model.entity";
import { IOtpRespository } from "domain/repositoryInterfaces/otp-repository.interface";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IRegisterUserUsecase } from "application/usecase/interfaces/auth/registerUsecase.interface";
import {
  EVENT_EMITTER_TYPE,
  HTTP_STATUS,
  MAIL_CONTENT_PURPOSE,
} from "shared/constants";
import { UserRegisterDTO } from "application/dto/requset/auth.dto";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/mailContentProvider";
import { hashPassword } from "shared/utils/bcryptHelper";
import { CustomError } from "domain/errors/customError";
import {
  ISuccessResponseHandler,
  successResponseHandler,
} from "shared/utils/successResponseHandler";
import { inject, injectable } from "tsyringe";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("IOtpRepository")
    private _otpRepository: IOtpRespository
  ) {}

  async execute(formData: UserRegisterDTO): Promise<ISuccessResponseHandler> {
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
    console.log(otp);
    const asyncOperations = [];

    asyncOperations.push(this._otpRepository.saveOtp(formData.email, otp));

    const html = mailContentProvider(MAIL_CONTENT_PURPOSE.OTP, otp);

    if (!userExists) {
      const password = formData.password;
      const hashedPassword = await hashPassword(password);
      formData.password = hashedPassword;
      asyncOperations.push(this._userRepository.createUser(formData));
    }
    await Promise.all(asyncOperations);
    eventBus.emit(
      EVENT_EMITTER_TYPE.SENDMAIL,
      formData.email,
      "Account creation",
      html
    );

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
