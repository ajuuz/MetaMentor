import { IUserModel } from "frameworks/database/models/user.model";
import { SignupRequestDto } from "shared/dto/authDTO"
import { UserUpdateDTO } from "shared/dto/userDTO";

export interface IUserRespository{
    findByEmail(email:string):Promise<IUserModel | null>
    findBynumber(number:string):Promise<boolean>
    createUser(formData:SignupRequestDto):Promise<void>;
    updateOne(filter:Partial<UserUpdateDTO.filter>,update:Partial<UserUpdateDTO.update>):Promise<void>
    findByEmailAndPassword(email:string,password:string):Promise<IUserModel | null>
}