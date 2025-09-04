import { UpdateMentorApplicationReqDTO } from "shared/dto/request/mentor.dto";


export interface IUpdateMentorApplicationUsecase{
    execute(userId:string,mentorDetails:UpdateMentorApplicationReqDTO):Promise<void>
}