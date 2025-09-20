import { GetMentorApplicationResDTO } from "application/dto/response/mentor.dto";

export interface IGetMentorApplicationDetailsUsecase {
  execute(mentorId: string): Promise<GetMentorApplicationResDTO>;
}
