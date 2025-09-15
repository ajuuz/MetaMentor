import { IUserEntity } from "domain/entities/user-model.entity";
import { IOtpRespository } from "domain/repositoryInterfaces/otp-repository.interface";
import { IStudentRepository } from "domain/repositoryInterfaces/student-repository.interface";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IWalletRepository } from "domain/repositoryInterfaces/walletRepository.inteface";
import { IVerifyOtpUsecase } from "application/usecase/interfaces/auth/verifyOtpUsecase.interface";
import { IUserModel } from "frameworks/database/models/user.model";
import { CustomError } from "domain/errors/customError";
import { NotFoundError } from "domain/errors/notFounError";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class VerifyOtpUsecase implements IVerifyOtpUsecase {
  constructor(
    @inject("IOtpRepository")
    private _otpRepository: IOtpRespository,

    @inject("IUserRepository")
    private _userRepository: IUserRespository,

    @inject("IStudentRepository")
    private _studentRepository: IStudentRepository,

    @inject("IWalletRepository")
    private _walletRepository: IWalletRepository
  ) {}

  async execute(email: string, otp: string): Promise<void> {
    if (!email || !otp) {
      throw new ValidationError("insuffient data");
    }

    const userOtp = await this._otpRepository.getOtp(email);
    if (!userOtp) {
      throw new NotFoundError("Otp has been expired");
    }

    if (otp !== userOtp) {
      throw new CustomError(401, "invalid otp");
    }

    const user = (await this._userRepository.findByEmail(email)) as IUserModel;

    const asyncOperations: Promise<void>[] = [];

    const filter: Pick<IUserEntity, "email"> = { email };
    const update: Pick<IUserEntity, "isVerified"> = {
      isVerified: true,
    };

    asyncOperations.push(this._userRepository.updateOne(filter, update));
    asyncOperations.push(this._studentRepository.createStudent(user._id));
    asyncOperations.push(
      this._walletRepository.insertOne({ userId: user._id })
    );

    await Promise.all(asyncOperations);
  }
}
