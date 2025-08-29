import { ICreateLevelEntity, ILevelEntity } from "entities/modelEntities/levelModel.entity";
import { ILevelModel } from "frameworks/database/models/level.model";

import { IBaseRepository } from "./baseRepository.interface";



export interface ILevelRepository extends IBaseRepository<ILevelEntity,ILevelModel>{
    inserManyLevels(levels:ICreateLevelEntity[]):Promise<void>
    getNextLevel(domainId:string,skip:number):Promise<ILevelModel[]>
}