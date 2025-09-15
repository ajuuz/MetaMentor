import { plainToInstance } from "class-transformer";
import { IGetMentorsUsecase } from "application/usecase/interfaces/mentor/getMentorsUsecase.interface";
import { IGetMentorsForAdminUsecase } from "application/usecase/interfaces/mentor/getMentorsForAdmin.interface";
import { GetMentorsForAdminResDTO } from "shared/dto/response/mentor.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMentorsForAdminUsecase implements IGetMentorsForAdminUsecase {
  constructor(
    @inject("IGetMentorsUsecase")
    private _getMentorsUsecase: IGetMentorsUsecase
  ) {}
  async execute(
    isVerified: boolean,
    sortBy: string,
    searchTerm: string,
    selectedDomains: string,
    currentPage: number,
    limit: number
  ): Promise<{ mentors: GetMentorsForAdminResDTO[]; totalPages: number }> {
    //filter
    const filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[] = [];

    if (!isVerified) {
      filters.push({ field: "isRejected", value: false, type: "direct" });
    }

    const { items, totalPages } = await this._getMentorsUsecase.execute(
      filters,
      isVerified,
      sortBy,
      searchTerm,
      selectedDomains,
      currentPage,
      limit
    );
    const mentors = plainToInstance(GetMentorsForAdminResDTO, items, {
      excludeExtraneousValues: true,
    });
    return { mentors, totalPages };
  }
}
