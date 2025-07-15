import { ILevelModel } from "frameworks/database/models/level.model";
import { IBaseRepository } from "./baseRepository.interface";
import { ILevelEntity } from "entities/modelEntities/levelModel.entity";
import { GetNextLevelResponseDTO } from "shared/dto/levelsDTO";



export interface ILevelRepository extends IBaseRepository<ILevelEntity,ILevelModel>{
    getNextLevel(domainId:string,skip:number):Promise<GetNextLevelResponseDTO[]>
}