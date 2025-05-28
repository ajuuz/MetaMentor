import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IUserRespository } from "entities/repositoryInterfaces/user/user-repository.interface";
import { IUserModel, userDB } from "frameworks/database/models/user.model";
import { ISignupDto } from "shared/dto/authDto/signupDto";
import { injectable } from "tsyringe";

@injectable()
export class UserRepository implements IUserRespository{

    async findByEmail(email:string):Promise<IUserEntity | null>{
        const user = await userDB.findOne({email});
        return user
    }

    async createUser(formData:ISignupDto):Promise<void>{
        const newUser = new userDB(formData);
        await newUser.save();
    }
}