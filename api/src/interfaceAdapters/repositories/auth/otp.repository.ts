import { IUserEntity } from "entities/modelEntities/user-model.entity";
import { IOtpRepository } from "entities/repositoryInterfaces/user/otp-repository.interface";
import { IUserModel, userDB } from "frameworks/database/models/user.model";



export class OtpRepository implements IOtpRepository{

    async save(data:Partial<IUserEntity>):Promise<IUserEntity>{
            const user = new userDB(data)
            return user;
    }
}