import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUserModel, userDB } from "frameworks/database/models/user.model";
import { SignupRequestDto } from "shared/dto/authDTO";
import { UserUpdateDTO } from "shared/dto/userDTO";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRespository{

    async findByEmail(email:string):Promise<IUserModel | null>{
        const user = await userDB.findOne({email});
        return user
    }

    async findBynumber(number:string):Promise<boolean>{
        const user = await userDB.findOne({mobileNumber:number})
        return user?true:false
    }

    async createUser(formData:SignupRequestDto):Promise<void>{
        const newUser = new userDB(formData);
        await newUser.save();
    }

    async updateOne(filter:Partial<UserUpdateDTO.filter>,update:Partial<UserUpdateDTO.update>):Promise<void>{
        await userDB.updateOne(filter,update);
    }


    async findByEmailAndPassword(email:string,password:string):Promise<IUserModel | null>{
        const user = await userDB.findOne({email,password});
        return user;
    }

}