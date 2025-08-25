import { plainToInstance } from "class-transformer";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IGetVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getVerifiedMentors.interface";
import { GetMentorsForAdminResDTO } from "shared/dto/response/mentor.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetVerifiedMentorsUsecase implements IGetVerifiedMentorsUsecase {
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository
  ) {}
  async execute(
    currentPage: number,
    limit: number
  ): Promise<{ mentors: GetMentorsForAdminResDTO[]; totalPages: number }> {
    const skip: number = (currentPage - 1) * limit;
    const filter = {
      isVerified: true,
    };

    const { data, totalDocuments } = await this._mentorRepository.find(
      filter,
      skip,
      limit
    );
    const mentors = plainToInstance(GetMentorsForAdminResDTO, data, {
      excludeExtraneousValues: true,
    });
    const totalPages: number = Math.ceil(totalDocuments / limit);
    return { mentors, totalPages };
  }
}
