import {
  IGetMentorApplicationDetails,
  IGetMentorProfessionalDetails,
  IGetMentors,
  IMentorEntity,
} from "domain/entities/mentor-model.entity";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";
import {
  IMentorModel,
  mentorModel,
} from "infrastructure/database/models/mentor.model";
import mongoose, { FilterQuery, Types } from "mongoose";
import { SORT_ORDER } from "shared/constants";
import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";

@injectable()
export class MentorRepository
  extends BaseRepository<IMentorEntity, IMentorModel>
  implements IMentorRepository
{
  constructor() {
    super(mentorModel);
  }

  async findById(
    mentorId: string
  ): Promise<IGetMentorApplicationDetails | null> {
    const mentorObjectId = new Types.ObjectId(mentorId);
    const mentor = await mentorModel
      .aggregate([
        { $match: { userId: mentorObjectId } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "domains",
            localField: "domains",
            foreignField: "_id",
            as: "domains",
          },
        },
        { $unwind: "$userDetails" },
        {
          $project: {
            //userDetails
            ...this._userDetailsProjection,

            //professionalDetails
            ...this._professionalDetailsProjection,
          },
        },
      ])
      .exec();
    return mentor?.[0] ? mentor[0] : null;
  }

  async findProfessionalDetails(
    mentorId: string
  ): Promise<IGetMentorProfessionalDetails | null> {
    const mentorObjectId = new Types.ObjectId(mentorId);
    const mentor = await mentorModel
      .aggregate([
        { $match: { userId: mentorObjectId } },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "domains",
            localField: "domains",
            foreignField: "_id",
            as: "domains",
          },
        },
        { $unwind: "$userDetails" },
        {
          $project: {
            //professionalDetails
            ...this._professionalDetailsProjection,
          },
        },
      ])
      .exec();
    return mentor?.[0] ? mentor[0] : null;
  }

  async register(
    userId: string,
    mentorDetails: Partial<IMentorEntity>
  ): Promise<void> {
    const newMentor = new mentorModel({ userId, ...mentorDetails });
    await newMentor.save();
  }

  async findMentorsWithFilterAndPagination(
    filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[],
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ items: IGetMentors[]; totalDocuments: number }> {
    const mongoFilter: FilterQuery<IMentorModel> = {};

    filters.forEach((item) => {
      if (item.type === "direct") {
        mongoFilter[item.field] = item.value;
      } else {
        if (item.field === "searchTerm") {
          if (!isNaN(Number(item.value))) {
            mongoFilter["$expr"] = {
              $regexMatch: {
                input: { $toString: "$seq" },
                regex: item.value,
                options: "i",
              },
            };
          } else {
            mongoFilter["user.name"] = { $regex: item.value, $options: "i" };
          }
        }

        if (
          item.field === "selectedDomains" &&
          typeof item.value === "string"
        ) {
          const domains = item.value
            .split(",")
            .map((domainId) => new mongoose.Types.ObjectId(domainId));
          mongoFilter["domains"] = { $all: domains };
        }
      }
    });

    let sortOption: Record<string, 1 | -1> = {};
    if (sort.field === "name") {
      sortOption["user.name"] = sort.order === SORT_ORDER.ASC ? 1 : -1;
    } else {
      sortOption["user.createdAt"] = sort.order === SORT_ORDER.ASC ? 1 : -1;
    }

    const userLookupPipeline = {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    };

    const domainLookupPipeline = {
      $lookup: {
        from: "domains",
        localField: "domains",
        foreignField: "_id",
        as: "domains",
      },
    };

    const projectPipeline = {
      $project: {
        _id: 0,
        userId: 1,
        seq: 1,
        name: "$user.name",
        profileImage: "$user.profileImage",
        country: "$user.country",
        mobileNumber: "$user.mobileNumber",
        domains: {
          $map: {
            input: "$domains",
            as: "domain",
            in: {
              _id: "$$domain._id",
              name: "$$domain.name",
              image: "$$domain.image",
            },
          },
        },
        skills: 1,
        workedAt: 1,
        fee: 1,
        rating: {
          $cond: [
            { $eq: ["$rating.noOfRaters", 0] },
            0,
            { $divide: ["$rating.totalStars", "$rating.noOfRaters"] },
          ],
        },
        about: 1,
        isBlocked: 1,
      },
    };

    const response = await mentorModel.aggregate([
      userLookupPipeline,
      { $unwind: "$user" },
      { $match: mongoFilter },
      {
        $facet: {
          items: [
            { $sort: sortOption },
            { $skip: skip },
            { $limit: limit },
            domainLookupPipeline,
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
    const { items, totalDocuments } = response[0];
    return { items, totalDocuments };
  }

  async getStatus(userId: string): Promise<IMentorEntity | null> {
    const user = await mentorModel.findOne({ userId }).lean<IMentorEntity>();
    return user;
  }

  //projection
  private _previewDomainProjection = {
    $map: {
      input: "$domains",
      as: "domain",
      in: {
        _id: { $toString: "$$domain._id" },
        name: "$$domain.name",
        image: "$$domain.image",
      },
    },
  };

  private _professionalDetailsProjection = {
    skills: 1,
    workedAt: 1,
    fee: 1,
    about: 1,
    cv: 1,
    experienceCirtificate: 1,
    domains: this._previewDomainProjection,
  };
  private _userDetailsProjection = {
    name: "$userDetails.name",
    profileImage: "$userDetails.profileImage",
    country: "$userDetails.country",
    gender: "$userDetails.gender",
    mobileNumber: "$userDetails.mobileNumber",
    email: "$userDetails.email",
  };
}
