import {
  IGetMentorForAdmin,
  IGetMentorsForAdmin,
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
          about: 1,
          cv: 1,
          experienceCirtificate: 1,
          skills: 1,
          workedAt: 1,
          fee: 1,
          name: "$userDetails.name",
          country: "$userDetails.country",
          gender: "$userDetails.gender",
          mobileNumber: "$userDetails.mobileNumber",
          email: "$userDetails.email",
          profileImage: "$userDetails.profileImage",
          domains: {
            $map: {
              input: "$domains",
              as: "domain",
              in: {
                _id: "$$domain._id",
                name: "$$domain.name",
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
    searchTerm: string,
    selectedDomains:string,
    filter: Partial<IMentorEntity>,
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ data: IGetMentorsForAdmin[]; totalDocuments: number }> {
    const mongoFilter = filter as unknown as FilterQuery<IMentorModel>;

    if (searchTerm) {
      mongoFilter["user.name"] = { $regex: searchTerm, $options: "i" };
    }

    if(selectedDomains){
        const domains = selectedDomains.split(',').map((domainId)=>new mongoose.Types.ObjectId(domainId))
        mongoFilter['domains']={$all:domains}
    }

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
        country: "$user.country",
        mobileNumber: "$user.mobileNumber",
        userId: 1,
        domains: {
          $map: {
            input: "$domains",
            as: "d",
            in: "$$d.name",
          },
        },
        skills: 1,
        workedAt: 1,
        fee: 1,
        isBlocked: 1,
      },
    };

    const response = await mentorModel.aggregate([
      userLookupPipeline,
      { $unwind: "$user" },
      { $match: mongoFilter },
      {
        $facet: {
          data: [
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
    const {data,totalDocuments}=response[0];
    return {data,totalDocuments}
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
