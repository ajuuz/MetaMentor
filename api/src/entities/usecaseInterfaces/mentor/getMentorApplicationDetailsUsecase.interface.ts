import { GetMentorApplicationResDTO } from "shared/dto/response/mentor.dto";


export interface IGetMentorApplicationDetailsUsecase{
    execute(mentorId:string):Promise<GetMentorApplicationResDTO>
}