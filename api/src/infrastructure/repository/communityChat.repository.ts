import {
  ICommunityChatEnitity,
  IGetCommunityChat,
} from "domain/entities/communityChat.entity";
import { ICommunityChatRepository } from "domain/repositoryInterfaces/communityChatRepository.interface";

import {
  communityChatModel,
  ICommunityChatModel,
} from "infrastructure/database/models/communityChat.model";
import mongoose from "mongoose";
import { injectable } from "tsyringe";

import { BaseRepository } from "./base.repository";


@injectable()
export class CommunityChatRepository
  extends BaseRepository<ICommunityChatEnitity, ICommunityChatModel>
  implements ICommunityChatRepository
{
  constructor() {
    super(communityChatModel);
  }

  async saveMessage(
    message: Partial<IGetCommunityChat>
  ): Promise<IGetCommunityChat> {
    // Create a new chat document
    const newCommunityChat = new communityChatModel(message);
    await newCommunityChat.save();

    // Populate the studentId to get studentName
    await newCommunityChat.populate<{ studentId: { name: string } }>(
      "studentId"
    );

    const studentName = (
      newCommunityChat.studentId as unknown as { name: string }
    ).name;
    return {
      _id: newCommunityChat._id.toString(),
      communityId: newCommunityChat.communityId.toString(),
      content: newCommunityChat.content,
      createdAt: newCommunityChat.createdAt,
      updatedAt: newCommunityChat.updatedAt,
      studentName: studentName || "Unknown", // populated name
    };
  }

  async getAllMessages(
    communityId: string,
    limit: number
  ): Promise<IGetCommunityChat[]> {
    const chats = await communityChatModel.aggregate([
      {
        $match: {
          communityId: new mongoose.Types.ObjectId(communityId),
        },
      },
      { $limit: limit },
      {
        $lookup: {
          from: "users", // name of the users collection
          localField: "studentId", // field in communityPost
          foreignField: "_id", // field in users collection
          as: "student",
        },
      },
      { $unwind: "$student" },
      {
        $project: {
          _id: 1,
          content: 1,
          createdAt: 1,
          studentName: "$student.name",
        },
      },
    ]);

    return chats;
  }
}
