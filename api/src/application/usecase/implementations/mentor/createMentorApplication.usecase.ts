import { IMentorEntity } from "domain/entities/mentor-model.entity";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import { ICreateMentorApplicationUsecase } from "application/usecase/interfaces/mentor/createMentorApplicationUsecase.interface";
import { HTTP_STATUS } from "shared/constants";
import { CreateMentorApplicationReqDTO } from "shared/dto/request/mentor.dto";
import { CustomError } from "domain/errors/customError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateMentorApplicationUsecase
  implements ICreateMentorApplicationUsecase
{
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository
  ) {}

  async execute(
    userId: string,
    mentorDetails: CreateMentorApplicationReqDTO
  ): Promise<void> {
    const isMentorExists = await this._mentorRepository.findById(userId);
    if (isMentorExists) {
      throw new CustomError(HTTP_STATUS.CONFLICT, "mentor already exists");
    }
    const mappedDetails: Pick<
      IMentorEntity,
      | "userId"
      | "about"
      | "domains"
      | "cv"
      | "experienceCirtificate"
      | "skills"
      | "workedAt"
      | "fee"
    > = {
      userId,
      about: mentorDetails.about,
      domains: mentorDetails.domains,
      cv: mentorDetails.images[0],
      experienceCirtificate: mentorDetails.images[1],
      skills: mentorDetails.skills,
      workedAt: mentorDetails.workedAt,
      fee: mentorDetails.fee,
    };

    await this._mentorRepository.insertOne(mappedDetails);
  }
}
