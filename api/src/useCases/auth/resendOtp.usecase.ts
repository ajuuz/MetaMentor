import { IOtpRespository } from "entities/repositoryInterfaces/otp-repository.interface";
import { IResendOtpUsecase } from "entities/usecaseInterfaces/auth/resendOtpUsecase.interface";
import { EVENT_EMITTER_TYPE } from "shared/constants";
import { eventBus } from "shared/eventBus";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";


@injectable()
export class ResendOtpUsecase implements IResendOtpUsecase{

    constructor(
        @inject('IOtpRepository')
        private _otpRepository:IOtpRespository,

    ){}
    async execute(email:string):Promise<void>{
         if(!email) throw new ValidationError("Email is required")

        const otpExists = await this._otpRepository.getOtp(email);
        if (otpExists) {
          await this._otpRepository.deleteOtp(email);
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await this._otpRepository.saveOtp(email,otp);

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
        eventBus.emit(EVENT_EMITTER_TYPE.SENDMAIL,email,"Resend otp",html)
    }
}