import { NotFoundError } from "domain/errors/notFounError";
import { ValidationError } from "domain/errors/validationError";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";

import { GetProfessionalDetailsResDTO } from "application/dto/response/mentor.dto";
import { IGetProfessionalDetailsUsecase } from "application/usecase/interfaces/mentor/getProfessionalDetailsUsecase.interface";
import { plainToInstance } from "class-transformer";
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
