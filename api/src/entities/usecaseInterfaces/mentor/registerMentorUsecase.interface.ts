import { ApplyForMentorReqDTO } from "shared/dto/request/mentor.dto";


export interface IRegisterMentorUsecase{
    execute(userId:string,mentorDetails:ApplyForMentorReqDTO):Promise<void>
}