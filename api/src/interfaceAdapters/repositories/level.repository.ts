import { ILevelModel, levelModel } from "frameworks/database/models/level.model";
import { BaseRepository } from "./base.repository";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { ILevelEntity } from "entities/modelEntities/levelModel.entity";
import { GetNextLevelResponseDTO } from "shared/dto/levelsDTO";


export class LevelRepository extends BaseRepository<ILevelEntity,ILevelModel> implements ILevelRepository{

    constructor(){
        super(levelModel)
    }


    async getNextLevel(domainId:string,skip:number):Promise<GetNextLevelResponseDTO[]>{
        const levels:GetNextLevelResponseDTO[]= await levelModel.find({domainId},{name:1,description:1,taskFile:1}).skip(skip).limit(2)
        return levels
    }
}