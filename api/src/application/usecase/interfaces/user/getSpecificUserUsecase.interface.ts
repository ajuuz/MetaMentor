import { GetUserDetailsResDTO } from "shared/dto/response/user.dto";

export interface IGetSpecificUserUsecase{

    execute(userId:string):Promise<GetUserDetailsResDTO>
}