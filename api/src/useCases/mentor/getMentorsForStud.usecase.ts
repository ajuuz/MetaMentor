import { plainToInstance } from "class-transformer";
import { IGetMentorsUsecase } from "entities/usecaseInterfaces/mentor/getMentorsUsecase.interface";
import { IGetMentorsForStudUsecase } from "entities/usecaseInterfaces/mentor/getMentorsForStudUsecase.interface";
import { GetMentorsForStudResDTO } from "shared/dto/response/mentor.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMentorsForStudUsecase
  implements IGetMentorsForStudUsecase
{
  constructor(
    @inject("IGetMentorsUsecase")
    private _getMentorsUsecase: IGetMentorsUsecase
  ) {}
  async execute(
    sortBy: string,
    searchTerm: string,
    selectedDomains: string,
    currentPage: number,
    limit: number
  ): Promise<{ mentors: GetMentorsForStudResDTO[]; totalPages: number }> {
    //filter
    const filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[] = [];

    filters.push({ field: "isBlocked", value: false, type: "direct" });
    const isVerified = true;
    const { items, totalPages } = await this._getMentorsUsecase.execute(
      filters,
      isVerified,
      sortBy,
      searchTerm,
      selectedDomains,
      currentPage,
      limit
    );
    const mentors = plainToInstance(GetMentorsForStudResDTO, items, {
      excludeExtraneousValues: true,
    });
    return { mentors, totalPages };
  }
}
