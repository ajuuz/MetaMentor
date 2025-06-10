import { GetAllMentorResponseDTO } from "shared/dto/mentorDTO";

export interface  IGetVerifiedMentorsUsecase{
    execute(currentPage:number,limit:number):Promise<Omit<Omit<GetAllMentorResponseDTO,"cv"|"experienceCirtificate">,"totalDocuments">>
}