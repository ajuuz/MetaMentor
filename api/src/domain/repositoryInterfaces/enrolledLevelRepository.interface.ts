import {
  IEnrolledLevelEntity,
  IGetEnrolledLevel,
} from "domain/entities/enrolledLevelModel";

import { IEnrolledLevelModel } from "infrastructure/database/models/enrolledLevel.model";

import { IBaseRepository } from "./baseRepository.interface";

export interface IEnrolledLevelRepository
  extends IBaseRepository<IEnrolledLevelEntity, IEnrolledLevelModel> {
  getNextLevels(
    studentId: string,
    domainId: string,
    skip: number
  ): Promise<IGetEnrolledLevel[]>;
  saveLevelAssignments(
    enrolledLevelId: string,
    assignments: string[]
  ): Promise<void>;
}
