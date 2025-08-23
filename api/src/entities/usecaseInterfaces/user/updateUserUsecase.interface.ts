
import { UpdateUserDetailsReqDTO } from "shared/dto/request/user.dto"

export interface IUpdateUserUsecase{
    execute(userId:string,updatedData:UpdateUserDetailsReqDTO):Promise<void>
}