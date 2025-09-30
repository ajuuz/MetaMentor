import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IEmailService } from "application/interfaces/service/email-service.interface";
import { ITokenService } from "application/interfaces/service/tokenService.interface";
import { IForgotPasswordSendMailUsecase } from "application/usecase/interfaces/auth/forgotPasswordMailUsecase.interface";
import { MAIL_CONTENT_PURPOSE } from "shared/constants";
import { mailContentProvider } from "shared/contentProviders/mailContentProvider";
import { NotFoundError } from "domain/errors/notFounError";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class ForgotPasswordSendMailUsecase
  implements IForgotPasswordSendMailUsecase
{
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("ITokenService")
    private _tokenService: ITokenService,

    @inject("IEmailService")
    private _emailService: IEmailService
  ) {}

  async execute(email: string): Promise<void> {
    if (!email) throw new ValidationError("Email is required");

    const user = await this._userRepository.findByEmail(email);

    if (!user || !user.isVerified) throw new NotFoundError("User not found");

    const token = this._tokenService.generateForgotPasswordToken(email);
    const html = mailContentProvider(
      MAIL_CONTENT_PURPOSE.FORGOT_PASSWORD,
      token
    );

    await this._emailService.sendMail(email, "Password Reset Request", html);
  }
}
