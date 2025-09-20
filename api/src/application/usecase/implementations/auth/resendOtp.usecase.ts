import { IOtpRespository } from "domain/repositoryInterfaces/otp-repository.interface";
import { IResendOtpUsecase } from "application/usecase/interfaces/auth/resendOtpUsecase.interface";
import { EVENT_EMITTER_TYPE, MAIL_CONTENT_PURPOSE } from "shared/constants";
import { eventBus } from "shared/eventBus";
import { mailContentProvider } from "shared/mailContentProvider";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ResendOtpUsecase implements IResendOtpUsecase {
  constructor(
    @inject("IOtpRepository")
    private _otpRepository: IOtpRespository
  ) {}
  async execute(email: string): Promise<void> {
    if (!email) throw new ValidationError("Email is required");

    const otpExists = await this._otpRepository.getOtp(email);
    if (otpExists) {
      await this._otpRepository.deleteOtp(email);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this._otpRepository.saveOtp(email, otp);

    const html = mailContentProvider(MAIL_CONTENT_PURPOSE.OTP, otp);
    eventBus.emit(EVENT_EMITTER_TYPE.SENDMAIL, email, "Resend otp", html);
  }
}
