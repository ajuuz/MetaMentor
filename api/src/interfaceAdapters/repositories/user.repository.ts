import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IUserRespository } from "entities/repositoryInterfaces/user-repository.interface";
import { IUserModel, userDB } from "frameworks/database/models/user.model";
import { SignupRequestDto } from "shared/dto/authDTO";
import { UserDetailsResponseDTO, UserFindFilterDTO, UserUpdateDTO } from "shared/dto/userDTO";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRespository{

    async findByEmail(email:string):Promise<IUserModel|null>{
        const user = await userDB.findOne({email});
        return user
    }

    async findOne(filter:Partial<UserFindFilterDTO>):Promise<UserDetailsResponseDTO|null>{
        const user = await userDB.findOne(filter,{name:1,profileImage:1,country:1,gender:1,mobileNumber:1,email:1,_id:0})
        return user
    }

    async findBynumber(number:string):Promise<boolean>{
        const user = await userDB.findOne({mobileNumber:number})
        return user?true:false
    }

    async createUser(formData:Partial<SignupRequestDto>):Promise<IUserModel>{
        const newUser=new userDB(formData);
        await newUser.save();
        return newUser
    }

    async updateOne(filter:Partial<UserUpdateDTO.filter>,update:Partial<UserUpdateDTO.update>):Promise<void>{
        console.log("comes here")
        const updated=await userDB.updateOne(filter,update);
        console.log(updated)
    }


    async findByEmailAndPassword(email:string,password:string):Promise<IUserModel | null>{
        const user = await userDB.findOne({email,password});
        return user;
    }

}