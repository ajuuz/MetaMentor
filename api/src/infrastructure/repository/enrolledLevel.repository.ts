import {
  IEnrolledLevelEntity,
  IGetEnrolledLevel,
} from "domain/entities/enrolledLevelModel";
import { IEnrolledLevelRepository } from "domain/repositoryInterfaces/enrolledLevelRepository.interface";

import {
  EnrolledLevelModel,
  IEnrolledLevelModel,
} from "infrastructure/database/models/enrolledLevel.model";
import mongoose from "mongoose";

import { BaseRepository } from "./base.repository";

export class EnrolledLevelRepository
  extends BaseRepository<IEnrolledLevelEntity, IEnrolledLevelModel>
  implements IEnrolledLevelRepository
{
  constructor() {
    super(EnrolledLevelModel);
  }

  async getNextLevels(
    studentId: string,
    domainId: string,
    skip: number
  ): Promise<IGetEnrolledLevel[]> {
    const levels = await EnrolledLevelModel.aggregate([
      {
        $match: {
          domainId: new mongoose.Types.ObjectId(domainId),
          studentId: new mongoose.Types.ObjectId(studentId),
        },
      },
      { $skip: skip },
      { $limit: 2 },
      {
        $lookup: {
          from: "levels",
          localField: "levelId",
          foreignField: "_id",
          as: "levelData",
        },
      },
      {
        $unwind: "$levelData",
      },
      {
        $project: {
          name: "$levelData.name",
          levelId: 1,
          description: "$levelData.description",
          taskFile: "$levelData.taskFile",
          tasks: "$levelData.tasks",
          assignments: 1,
        },
      },
    ]);
    return levels;
  }

  async saveLevelAssignments(
    enrolledLevelId: string,
    assignments: string[]
  ): Promise<void> {
    await EnrolledLevelModel.updateOne(
      { _id: enrolledLevelId },
      { assignments }
    );
  }
}
