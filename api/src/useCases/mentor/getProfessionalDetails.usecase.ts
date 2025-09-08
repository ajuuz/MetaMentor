import { plainToInstance } from "class-transformer";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IGetProfessionalDetailsUsecase } from "entities/usecaseInterfaces/mentor/getProfessionalDetailsUsecase.interface";
import { GetProfessionalDetailsResDTO } from "shared/dto/response/mentor.dto";
import { NotFoundError } from "shared/utils/error/notFounError";
import { ValidationError } from "shared/utils/error/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetProfessionalDetailsUsecase
  implements IGetProfessionalDetailsUsecase
{
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository
  ) {}

  async execute(userId: string): Promise<GetProfessionalDetailsResDTO> {
    if (!userId) throw new ValidationError("invalid credentials");

    const mentor = await this._mentorRepository.findProfessionalDetails(userId);
    if (!mentor) throw new NotFoundError("mentor not found");
    const user = plainToInstance(GetProfessionalDetailsResDTO, mentor, {
      excludeExtraneousValues: true,
    });
    return user;
  }
}
