import { IUserEntity } from "entities/modelEntities/user-model.entity";



export interface IOtpUsecase {
    handle(data:Partial<IUserEntity>):Promise<void>;
}