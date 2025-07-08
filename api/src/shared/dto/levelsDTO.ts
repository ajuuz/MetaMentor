import { ILevelEntity } from "entities/modelEntities/levelModel.entity"
import { ObjectId } from "mongoose"


export type levelDTO=Omit<ILevelEntity,'_id'>;