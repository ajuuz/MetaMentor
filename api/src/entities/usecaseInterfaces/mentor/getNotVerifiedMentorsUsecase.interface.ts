import { GetMentorsForAdminResDTO } from "shared/dto/response/mentor.dto";

export interface IGetNotVerifiedMentorsUsecase{
execute(currentPage:number,limit:number):Promise<{mentors:GetMentorsForAdminResDTO[],totalPages:number}>}