import { GetProfessionalDetailsResDTO } from "application/dto/response/mentor.dto";

export interface IGetProfessionalDetailsUsecase {
  execute(userId: string): Promise<GetProfessionalDetailsResDTO>;
}
