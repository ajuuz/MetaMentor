import { IGetMentors } from "domain/entities/mentor-model.entity";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";

import { IGetMentorsUsecase } from "application/usecase/interfaces/mentor/getMentorsUsecase.interface";
import { SORT_ORDER } from "shared/constants";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMentorsUsecase implements IGetMentorsUsecase {
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository
  ) {}
  async execute(
    filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[],
    isVerified: boolean,
    sortBy: string,
    searchTerm: string,
    selectedDomains: string,
    currentPage: number,
    limit: number
  ): Promise<{ items: IGetMentors[]; totalPages: number }> {
    // skip
    const skip: number = (currentPage - 1) * limit;

    //filter
    filters.push({ field: "isVerified", value: isVerified, type: "direct" });

    if (searchTerm) {
      filters.push({ field: "searchTerm", value: searchTerm, type: "complex" });
    }

    if (selectedDomains) {
      filters.push({
        field: "selectedDomains",
        value: selectedDomains,
        type: "complex",
      });
    }

    //sort
    const [field, order] = sortBy!.split("-");
    const sort = { field, order: order as SORT_ORDER };

    const { items, totalDocuments } =
      await this._mentorRepository.findMentorsWithFilterAndPagination(
        filters,
        skip,
        limit,
        sort
      );

    const totalPages: number = Math.ceil(totalDocuments / limit);
    return { items, totalPages };
  }
}
