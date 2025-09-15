import { GetMentorsForStudResDTO } from "shared/dto/response/mentor.dto";

export interface IGetMentorsForStudUsecase {
  execute(
    sortBy: string,
    searchTerm: string,
    selectedDomains: string,
    currentPage: number,
    limit: number,
  ): Promise<{ mentors: GetMentorsForStudResDTO[]; totalPages: number }> ;
}
