import { IUserEntity } from "entities/modelEntities/user-model.entity"
import { IUserModel } from "frameworks/database/models/user.model";
import { ISignupRequestDto } from "shared/dto/authDto"

export interface IUserRespository{
    findByEmail(email:string):Promise<IUserModel | null>
    createUser(formData:ISignupRequestDto):Promise<void>;
    updateVerification(email:string):Promise<void>;
    findByEmailAndPassword(email:string,password:string):Promise<IUserModel | null>
}