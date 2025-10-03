import {
  ICreateLevelEntity,
  ILevelEntity,
} from "domain/entities/levelModel.entity";
import { ILevelRepository } from "domain/repositoryInterfaces/levelRepository.interface";

import {
  ILevelModel,
  levelModel,
} from "infrastructure/database/models/level.model";

import { BaseRepository } from "./base.repository";

export class LevelRepository
  extends BaseRepository<ILevelEntity, ILevelModel>
  implements ILevelRepository
{
  constructor() {
    super(levelModel);
  }

  async inserManyLevels(levels: ICreateLevelEntity[]): Promise<void> {
    await levelModel.insertMany(levels);
  }

  async replaceLevel(
    levelId: string,
    levelData: Omit<ILevelEntity, "_id">
  ): Promise<void> {
    await levelModel.replaceOne({ _id: levelId }, levelData);
  }

  async getNextLevel(domainId: string, skip: number): Promise<ILevelModel[]> {
    const levels = await levelModel.find({ domainId }).skip(skip).limit(2);
    return levels;
  }

  async updateStatus(id: string, status: boolean): Promise<void> {
    await this.model.updateOne({ _id: id }, { isBlocked: status });
  }
}
