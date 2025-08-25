import {
  IGetStudentsForAdmin,
  IStudentEntity,
} from "entities/modelEntities/student-model.entity";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import {
  IStudentModel,
  studentModel,
} from "frameworks/database/models/student.model";
import { ObjectId, Types } from "mongoose";

import { BaseRepository } from "./base.repository";

export class StudentRepository
  extends BaseRepository<IStudentEntity, IStudentModel>
  implements IStudentRepository
{
  constructor() {
    super(studentModel);
  }

  async createStudent(userId: ObjectId): Promise<void> {
    const newStudent = new studentModel({ userId });
    await newStudent.save();
  }

  async findStudents(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ data: IGetStudentsForAdmin[]; totalDocuments: number }> {
    const [data, totalDocuments] = await Promise.all([
      studentModel.aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: "users",
            let: { userId: "$userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$_id", "$$userId"] },
                      { $eq: ["$role", "user"] },
                    ],
                  },
                },
              },
            ],
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $project: {
            _id: 0,
            userId: 1,
            isBlocked: 1,
            point: 1,
            isPremium: 1,
            name: "$user.name",
            country: "$user.country",
            gender: "$user.gender",
            mobileNumber: "$user.mobileNumber",
          },
        },
      ]),
      studentModel.countDocuments(filter),
    ]);
    return { data, totalDocuments };
  }

  async updateOne(filter: any, update: any): Promise<void> {
    await studentModel.updateOne(filter, update);
  }

  async updateStatus(userId: string, status: boolean): Promise<number> {
    const update = await studentModel.updateOne(
      { userId },
      { $set: { isBlocked: status } }
    );
    return update.modifiedCount;
  }

  async getStatus(userId: string): Promise<IStudentEntity | null> {
    const user = await studentModel.findOne({ userId });
    return user;
  }

  async pushDomain(userId: string, domainId: string): Promise<void> {
    const domainObjectId = new Types.ObjectId(domainId);
    await studentModel.updateOne(
      { userId },
      { $addToSet: { domains: { domainId: domainObjectId } } }
    );
  }
}
