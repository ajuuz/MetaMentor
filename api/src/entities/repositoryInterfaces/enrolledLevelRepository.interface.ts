import { IEnrolledLevelEntity, IGetEnrolledLevel } from "entities/modelEntities/enrolledLevelModel";
import { IBaseRepository } from "./baseRepository.interface";
import { IEnrolledLevelModel } from "frameworks/database/models/enrolledLevel.model";

export interface IEnrolledLevelRepository
  extends IBaseRepository<IEnrolledLevelEntity, IEnrolledLevelModel> {
  getNextLevels(studentId: string,domainId: string, skip: number): Promise<IGetEnrolledLevel[]>;
}
