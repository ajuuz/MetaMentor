import { ILevelEntity } from "entities/modelEntities/levelModel.entity"


export type levelDTO=Omit<ILevelEntity,'_id'>;

export type GetNextLevelResponseDTO=Omit<ILevelEntity,'domainId'>;