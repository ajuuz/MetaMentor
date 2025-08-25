import { GetMentorForAdminResDTO } from "shared/dto/response/mentor.dto";


export interface IGetSpecificMentorUsecase{
    execute(mentorId:string):Promise<GetMentorForAdminResDTO>
}