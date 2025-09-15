import { IUserEntity } from "domain/entities/user-model.entity";
import { IUserRespository } from "domain/repositoryInterfaces/user-repository.interface";
import { IUpdateUserUsecase } from "application/usecase/interfaces/user/updateUserUsecase.interface";
import { UpdateUserDetailsReqDTO } from "shared/dto/request/user.dto";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateUserUsecase implements IUpdateUserUsecase {
  constructor(
    @inject("IUserRepository")
    private _userRepository: IUserRespository
  ) {}
  async execute(
    userId: string,
    updatedData: UpdateUserDetailsReqDTO
  ): Promise<void> {
    if (!userId) throw new ValidationError("user id is required");
    const { name, country, gender, mobileNumber, images } = updatedData;
    const filter: Pick<IUserEntity, "_id"> = { _id: userId };
    const update: Partial<IUserEntity> = {};
    if (name) update.name = name;
    if (country) update.country = country;
    if (gender) update.gender = gender;
    if (mobileNumber) update.mobileNumber = mobileNumber;
    if (images && images.length) update.profileImage = images[0];

    console.log(update);
    await this._userRepository.updateOne(filter, update);
  }
}
