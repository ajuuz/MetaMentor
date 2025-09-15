import { GetProfessionalDetailsResDTO } from "shared/dto/response/mentor.dto";


export interface IGetProfessionalDetailsUsecase{
    execute(userId: string): Promise<GetProfessionalDetailsResDTO>
}