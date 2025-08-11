import {IUserModel} from "frameworks/database/models/user.model";
import { IuserRegisterData } from "shared/dto/request/auth.dto";
import {UserDetailsResponseDTO,UserFindFilterDTO,UserUpdateDTO} from "shared/dto/userDTO";

export interface IUserRespository{
    findByEmail(email:string):Promise<IUserModel|null>
    findOne(filter:Partial<UserFindFilterDTO>):Promise<UserDetailsResponseDTO|null>
    findBynumber(number:number):Promise<boolean>
    createUser(formData:IuserRegisterData):Promise<IUserModel>
    updateOne(filter:Partial<UserUpdateDTO.filter>,update:Partial<UserUpdateDTO.update>):Promise<void>
    findByEmailAndPassword(email:string,password:string):Promise<IUserModel|null>
}