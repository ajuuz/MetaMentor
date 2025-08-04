import { ILevelEntity } from "entities/modelEntities/levelModel.entity";
import { ILevelModel } from "frameworks/database/models/level.model";
import { GetNextLevelResponseDTO } from "shared/dto/levelsDTO";

import { IBaseRepository } from "./baseRepository.interface";



export interface ILevelRepository extends IBaseRepository<ILevelEntity,ILevelModel>{
    getNextLevel(domainId:string,skip:number):Promise<GetNextLevelResponseDTO[]>
}