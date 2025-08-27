import { GetMentorsForAdminResDTO } from "shared/dto/response/mentor.dto";

export interface IGetVerifiedMentorsUsecase {
  execute(
    currentPage: number,
    limit: number,
    sortBy:string,
    searchTerm:string,
    selectedDomains:string
  ): Promise<{ mentors: GetMentorsForAdminResDTO[]; totalPages: number }>;
}
