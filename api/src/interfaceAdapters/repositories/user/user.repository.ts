import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IUserRespository } from "entities/repositoryInterfaces/user/user-repository.interface";
import { IUserModel, userDB } from "frameworks/database/models/user.model";
import { ISignupRequestDto } from "shared/dto/authDto";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRespository{

    async findByEmail(email:string):Promise<IUserModel | null>{
        const user = await userDB.findOne({email});
        return user
    }

    async createUser(formData:ISignupRequestDto):Promise<void>{
        const newUser = new userDB(formData);
        await newUser.save();
    }

    async updateVerification(email:string):Promise<void>{
        await userDB.updateOne({email},{isVerified:true});
    }

    async findByEmailAndPassword(email:string,password:string):Promise<IUserModel | null>{
        const user = await userDB.findOne({email,password});
        return user;
    }
}