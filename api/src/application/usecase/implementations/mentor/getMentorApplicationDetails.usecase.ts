import { plainToInstance } from "class-transformer";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { IGetMentorApplicationDetailsUsecase } from "application/usecase/interfaces/mentor/getMentorApplicationDetailsUsecase.interface";
import { GetMentorApplicationResDTO } from "application/dto/response/mentor.dto";
import { NotFoundError } from "domain/errors/notFounError";
import { ValidationError } from "domain/errors/validationError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMentorApplicationDetailsUsecase
  implements IGetMentorApplicationDetailsUsecase
{
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository
  ) {}
  async execute(mentorId: string): Promise<GetMentorApplicationResDTO> {
    if (!mentorId) throw new ValidationError("user id is needed");

    const data = await this._mentorRepository.findById(mentorId);
    if (!data) throw new NotFoundError("No application found");
    const mentor = plainToInstance(GetMentorApplicationResDTO, data, {
      excludeExtraneousValues: true,
    });
    return mentor;
  }
}
