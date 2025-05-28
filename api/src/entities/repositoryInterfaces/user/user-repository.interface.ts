import { IUserEntity } from "entities/modelEntities/user-model.entity"
import { ISignupDto } from "shared/dto/authDto/signupDto"

export interface IUserRespository{
    findByEmail(email:string):Promise<IUserEntity | null>
    createUser(formData:ISignupDto):Promise<void>
}