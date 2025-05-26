import { IUserEntity } from "entities/modelEntities/user-model.entity";


export interface IOtpRepository {

    save(data:Partial<IUserEntity>):Promise<IUserEntity>;
}