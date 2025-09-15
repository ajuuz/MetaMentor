import { CreateMentorApplicationReqDTO } from "shared/dto/request/mentor.dto";


export interface ICreateMentorApplicationUsecase{
    execute(userId:string,mentorDetails:CreateMentorApplicationReqDTO):Promise<void>
}