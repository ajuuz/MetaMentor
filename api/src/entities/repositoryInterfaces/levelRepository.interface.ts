import { ILevelModel } from "frameworks/database/models/level.model";
import { IBaseRepository } from "./baseRepository.interface";
import { ILevelEntity } from "entities/modelEntities/levelModel.entity";



export interface ILevelRepository extends IBaseRepository<ILevelEntity,ILevelModel>{

}