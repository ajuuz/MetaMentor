import { IuserRegisterData } from "entities/modelEntities/user-model.entity";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUserModel, userModel } from "frameworks/database/models/user.model";
import { UserDetailsResponseDTO, UserFindFilterDTO, UserUpdateDTO } from "shared/dto/userDTO";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRespository{

    async findByEmail(email:string):Promise<IUserModel|null>{
        const user = await userModel.findOne({email});
        return user
    }

    async findOne(filter:Partial<UserFindFilterDTO>):Promise<UserDetailsResponseDTO|null>{
        const user = await userModel.findOne(filter,{name:1,profileImage:1,country:1,gender:1,mobileNumber:1,email:1,_id:0})
        return user
    }

    async findBynumber(number:number):Promise<boolean>{
        const user = await userModel.findOne({mobileNumber:number})
        return user?true:false
    }

    async createUser(formData:IuserRegisterData):Promise<IUserModel>{
        const newUser=new userModel(formData);
        await newUser.save();
        return newUser
    }

    async updateOne(filter:Partial<UserUpdateDTO.filter>,update:Partial<UserUpdateDTO.update>):Promise<void>{
        await userModel.updateOne(filter,update);
    }


    async findByEmailAndPassword(email:string,password:string):Promise<IUserModel | null>{
        const user = await userModel.findOne({email,password});
        return user;
    }

}