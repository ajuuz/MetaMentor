
import { UserUpdateDTO } from "shared/dto/userDTO"

export interface IUpdateUserUsecase{
    execute(userId:string,updatedData:Partial<Pick<UserUpdateDTO.update,"name"|"country"|"gender"|"mobileNumber"|"profileImage">>):Promise<void>
}