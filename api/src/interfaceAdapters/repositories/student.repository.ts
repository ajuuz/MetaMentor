import {
  IGetStudentsForAdmin,
  IStudentEntity,
} from "domain/entities/student-model.entity";
import { IStudentRepository } from "entities/repositoryInterfaces/student-repository.interface";
import {
  IStudentModel,
  studentModel,
} from "frameworks/database/models/student.model";
import { FilterQuery, ObjectId, SortOrder, Types } from "mongoose";

import { BaseRepository } from "./base.repository";
import { SORT_ORDER } from "shared/constants";

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

  async findStudentsWithFilterAndPagination(
    filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[],
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ data: IGetStudentsForAdmin[]; totalDocuments: number }> {
    const mongoFilter: FilterQuery<IStudentModel> = {};

    filters.forEach((item) => {
      const { field, value, type } = item;
      if (type === "direct") mongoFilter[field] = value;
      else {
        if (field === "searchTerm" && typeof value === "string") {
          if (!isNaN(Number(value))) {
            console.log("working");
            mongoFilter["$expr"] = {
              $regexMatch: {
                input: { $toString: "$seq" },
                regex: value,
                options: "i",
              },
            };
          } else {
            mongoFilter["user.name"] = { $regex: value, $options: "i" };
          }
        }
      }
    });

    let sortOption: Record<string, 1 | -1> = {};
    if (sort.field === "name") {
      sortOption["user.name"] = sort.order === SORT_ORDER.ASC ? 1 : -1;
    } else {
      sortOption["user.createdAt"] = sort.order === SORT_ORDER.ASC ? 1 : -1;
    }

    const lookupPipeline = {
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
    };

    const projectPipeline = {
      $project: {
        _id: 0,
        userId: 1,
        seq: 1,
        isBlocked: 1,
        point: 1,
        isPremium: 1,
        name: "$user.name",
        country: "$user.country",
        gender: "$user.gender",
        mobileNumber: "$user.mobileNumber",
      },
    };

    const response = await studentModel.aggregate([
      lookupPipeline,
      { $unwind: "$user" },
      { $match: mongoFilter },
      {
        $facet: {
          data: [
            { $sort: sortOption },
            { $skip: skip },
            { $limit: limit },
            projectPipeline,
          ],
          totalDocuments: [{ $count: "count" }, { $unwind: "$count" }],
        },
      },
      {
        $addFields: {
          totalDocuments: { $arrayElemAt: ["$totalDocuments.count", 0] },
        },
      },
    ]);
    const { data, totalDocuments } = response[0];
    return { data, totalDocuments };
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
