import { MentorRegisterRequestDTO } from "shared/dto/mentorDTO";


export interface IRegisterMentorUsecase{
    execute(userId:string,mentorDetails:MentorRegisterRequestDTO):Promise<void>
}