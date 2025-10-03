
import { injectable } from "tsyringe";
import { BaseRepository } from "./base.repository";
import { ICommunityPostRepository } from "domain/repositoryInterfaces/communityPostRepository.interface";
import {
  communityPostModel,
  ICommunityPostModel,
} from "infrastructure/database/models/communityPost.model";
import {
  ICommunityPostEntity,
  IGetCommunityPost,
} from "domain/entities/communityPostModel.entity";
import mongoose from "mongoose";

@injectable()
export class CommunityPostRepository
  extends BaseRepository<ICommunityPostEntity, ICommunityPostModel>
  implements ICommunityPostRepository
{
  constructor() {
    super(communityPostModel);
  }

  async createAPost(post: Partial<ICommunityPostEntity>): Promise<void> {
    const newCommunityPost = new communityPostModel(post);
    await newCommunityPost.save();
  }
  async getAllPosts(communityId: string): Promise<IGetCommunityPost[]> {
    const posts = await communityPostModel.aggregate([
      {
        $match: {
          communityId: new mongoose.Types.ObjectId(communityId),
          isBlocked: false,
        },
      },
      {
        $lookup: {
          from: "users", // name of the users collection
          localField: "studentId", // field in communityPost
          foreignField: "_id", // field in users collection
          as: "student",
        },
      },
      { $unwind: "$student" }, // flatten the array
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          description: 1,
          postedAt: 1,
          studentName: "$student.name",
        },
      },
    ]);

    return posts;
  }
}
