import {
  IGetMentorForAdmin,
  IGetMentors,
  IMentorEntity,
} from "entities/modelEntities/mentor-model.entity";
import { IMentorRepository } from "entities/repositoryInterfaces/mentorRepository.interface";
import {
  IMentorModel,
  mentorModel,
} from "frameworks/database/models/mentor.model";
import mongoose, { FilterQuery, Types } from "mongoose";
import { SORT_ORDER } from "shared/constants";
import { injectable } from "tsyringe";

@injectable()
export class MentorRepository implements IMentorRepository {
  async findById(mentorId: string): Promise<IGetMentorForAdmin | null> {
    const mentorObjectId = new Types.ObjectId(mentorId);
    const mentor = await mentorModel.aggregate([
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
          name: "$userDetails.name",
          profileImage: "$userDetails.profileImage",
          country: "$userDetails.country",
          skills: 1,
          workedAt: 1,
          fee: 1,
          about: 1,
          cv: 1,
          experienceCirtificate: 1,
          gender: "$userDetails.gender",
          mobileNumber: "$userDetails.mobileNumber",
          email: "$userDetails.email",
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
        },
      },
    ]);
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
          mongoFilter["user.name"] = { $regex: item.value, $options: "i" };
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
        name: "$user.name",
        profileImage:'$user.profileImage',
        country: "$user.country",
        mobileNumber: "$user.mobileNumber",
        userId: 1,
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
        rating:{
          $cond:[
            {$eq:["$rating.noOfRaters",0]},0,
            {$divide:["$rating.totalStars","$rating.noOfRaters"]}
          ]
        },
        about:1,
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

  async updateOne(
    filter: Partial<IMentorEntity>,
    update: Partial<IMentorEntity>
  ): Promise<void> {
    await mentorModel.updateOne(filter, update);
  }

  async getStatus(userId: string): Promise<IMentorEntity | null> {
    const user = await mentorModel.findOne({ userId }).lean<IMentorEntity>();
    return user;
  }
}
