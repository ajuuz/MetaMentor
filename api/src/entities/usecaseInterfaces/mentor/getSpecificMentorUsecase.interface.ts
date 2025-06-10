import { MentorDataDTO } from "shared/dto/mentorDTO";


export interface IGetSpecificMentorUsecase{
    execute(mentorId:string):Promise<MentorDataDTO>
}