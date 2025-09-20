import { GetMentorsForAdminResDTO } from "application/dto/response/mentor.dto";

export interface IGetMentorsForAdminUsecase {
  execute(
    isVerified: boolean,
    sortBy: string,
    searchTerm: string,
    selectedDomains: string,
    currentPage: number,
    limit: number
  ): Promise<{ mentors: GetMentorsForAdminResDTO[]; totalPages: number }>;
}
