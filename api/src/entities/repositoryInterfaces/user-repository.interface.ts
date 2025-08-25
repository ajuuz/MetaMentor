import { IUserEntity } from "entities/modelEntities/user-model.entity";
import {IUserModel} from "frameworks/database/models/user.model";
import { FilterQuery } from "mongoose";
import { IuserRegisterData } from "shared/dto/request/auth.dto";

export interface IUserRespository{
    findByEmail(email:string):Promise<IUserModel|null>
    findOne(filter:FilterQuery<IUserEntity>):Promise<IUserEntity|null>
    findBynumber(number:number):Promise<boolean>
    createUser(formData:IuserRegisterData):Promise<IUserModel>
    updateOne(filter:FilterQuery<IUserEntity>,update:Partial<IUserEntity>):Promise<void>
    findByEmailAndPassword(email:string,password:string):Promise<IUserModel|null>
}