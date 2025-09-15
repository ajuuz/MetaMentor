import { plainToInstance } from "class-transformer";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IGetSpecificUserUsecase } from "application/usecase/interfaces/user/getSpecificUserUsecase.interface";
import { GetUserDetailsResDTO } from "shared/dto/response/user.dto";
import { NotFoundError } from "domain/errors/notFounError";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetSpecificUserUsecase implements IGetSpecificUserUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository
  ) {}

  async execute(userId: string): Promise<GetUserDetailsResDTO> {
    if (!userId) throw new ValidationError("invalid credentials");

    const filter = { _id: userId };
    const userData = await this._userRepository.findOne(filter);
    if (!userData) throw new NotFoundError("user not found");
    const user = plainToInstance(GetUserDetailsResDTO, userData, {
      excludeExtraneousValues: true,
    });
    return user;
  }
}
