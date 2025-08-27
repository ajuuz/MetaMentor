import { plainToInstance } from "class-transformer";
import { IMentorEntity } from "entities/modelEntities/mentor-model.entity";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import { IGetNotVerifiedMentorsUsecase } from "entities/usecaseInterfaces/mentor/getNotVerifiedMentorsUsecase.interface";
import { SORT_ORDER } from "shared/constants";
import { GetMentorsForAdminResDTO } from "shared/dto/response/mentor.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetNotVerifiedMentorsUsecase
  implements IGetNotVerifiedMentorsUsecase
{
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository
  ) {}
  async execute(
    currentPage: number,
    limit: number,
    sortBy: string,
    searchTerm: string,
    selectedDomains:string
  ): Promise<{ mentors: GetMentorsForAdminResDTO[]; totalPages: number }> {
    const skip: number = (currentPage - 1) * limit;
    const filter: Partial<IMentorEntity> = {
      isVerified: false,
      isRejected: false,
    };
    //sort
    const splittedSortBy = sortBy.split("-");
    const sortingField = splittedSortBy[0];
    const sortingOrder = splittedSortBy[1] as SORT_ORDER;
    const sort = { field: sortingField, order: sortingOrder };


    const { data, totalDocuments } =
      await this._mentorRepository.findMentorsWithFilterAndPagination(
        searchTerm,
        selectedDomains,
        filter,
        skip,
        limit,
        sort
      );
    const mentors = plainToInstance(GetMentorsForAdminResDTO, data, {
      excludeExtraneousValues: true,
    });
    const totalPages: number = Math.ceil(totalDocuments / limit);
    return { mentors, totalPages };
  }
}
