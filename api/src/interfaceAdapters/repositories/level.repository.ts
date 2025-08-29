import { ICreateLevelEntity, ILevelEntity } from "entities/modelEntities/levelModel.entity";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { ILevelModel, levelModel } from "frameworks/database/models/level.model";

import { BaseRepository } from "./base.repository";


export class LevelRepository extends BaseRepository<ILevelEntity,ILevelModel> implements ILevelRepository{

    constructor(){
        super(levelModel)
    }

    async inserManyLevels(levels:ICreateLevelEntity[]):Promise<void>{
        await levelModel.insertMany(levels);
    }

    async getNextLevel(domainId:string,skip:number):Promise<ILevelModel[]>{
        const levels= await levelModel.find({domainId}).skip(skip).limit(2)
        return levels
    }
}