import { ILevelModel, levelModel } from "frameworks/database/models/level.model";
import { BaseRepository } from "./base.repository";
import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { ILevelEntity } from "entities/modelEntities/levelModel.entity";


export class LevelRepository extends BaseRepository<ILevelEntity,ILevelModel> implements ILevelRepository{

    constructor(){
        super(levelModel)
    }
}