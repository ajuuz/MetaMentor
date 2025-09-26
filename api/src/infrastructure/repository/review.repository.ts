import {
  ICreateReview,
  IGetBookedSlotsForStud,
  IPopulatedReviewEntity,
  IGetReviewsForStudAndDomain,
  IReviewEntity,
} from "domain/entities/reviewModel.entity";
import { IReviewRepository } from "domain/repositoryInterfaces/reviewRepository.interface";
import {
  reviewModel,
  IReviewModel,
} from "infrastructure/database/models/bookedSlot.model";
import mongoose, { FilterQuery, UpdateQuery } from "mongoose";
import { PENDING_REVIEW_STATE, REVIEW_STATUS } from "shared/constants";

import { BaseRepository } from "./base.repository";

export class ReviewRepository
  extends BaseRepository<IReviewEntity, IReviewModel>
  implements IReviewRepository
{
  private _lookupForDomain = {
    $lookup: {
      from: "domains",
      localField: "domainId",
      foreignField: "_id",
      as: "domain",
    },
  };

  private _lookupForLevel = {
    $lookup: {
      from: "levels",
      localField: "levelId",
      foreignField: "_id",
      as: "level",
    },
  };
  private _lookupForMentor = {
    $lookup: {
      from: "users",
      localField: "mentorId",
      foreignField: "_id",
      as: "mentor",
    },
  };

  private _lookupForStudent = {
    $lookup: {
      from: "users",
      localField: "studentId",
      foreignField: "_id",
      as: "student",
    },
  };

  private _populatedProject = {
    domainName: "$domain.name",
    level: {
      name: "$level.name",
      taskFile: "$level.taskFile",
    },
    status: 1,
    payment: { method: "$payment.method", status: "$payment.status" },
    feedBack: 1,
    mentorEarning: 1,
    commissionAmount: 1,
    isRescheduledOnce: 1,
    slot: 1,
    theory: 1,
    practical: 1,
  };

  constructor() {
    super(reviewModel);
  }

  async findByStudentAndDomain(
    studentId: string,
    domainId: string
  ): Promise<IGetReviewsForStudAndDomain[]> {
    const reviews = await reviewModel.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(studentId),
          domainId: new mongoose.Types.ObjectId(domainId),
        },
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "mentorId",
          foreignField: "_id",
          as: "mentor",
          pipeline: [{ $project: { _id: 0, name: 1 } }],
        },
      },
      {
        $unwind: "$mentor",
      },
      {
        $lookup: {
          from: "levels",
          localField: "levelId",
          foreignField: "_id",
          as: "level",
          pipeline: [{ $project: { _id: 0, name: 1, taskFile: 1 } }],
        },
      },
      {
        $unwind: "$level",
      },
      {
        $project: {
          status: 1,
          slot: 1,
          payment: 1,
          feedBack: 1,
          mentorEarning: 1,
          commissionAmount: 1,
          theory: 1,
          practical: 1,
          mentorName: "$mentor.name",
          level: {
            name: "$level.name",
            taskFile: "$level.taskFile",
          },
        },
      },
    ]);

    return reviews;
  }

  async getPassedReviewsCount(
    studentId: string,
    domainId: string
  ): Promise<number> {
    const count = await reviewModel.countDocuments({
      studentId,
      domainId,
      status: REVIEW_STATUS.PASS,
    });
    return count;
  }

  async findByDomain(domainId: string): Promise<IGetBookedSlotsForStud[]> {
    const reviews = await reviewModel.aggregate([
      { $match: { domainId: new mongoose.Types.ObjectId(domainId) } },
      {
        $lookup: {
          from: "mentors",
          localField: "mentorId",
          foreignField: "userId",
          as: "mentor",
        },
      },
      {
        $unwind: "$mentor",
      },
      {
        $group: {
          _id: "$mentor.userId",
          mentor: { $first: "$mentor" },
          slots: { $push: "$slot" },
        },
      },
      {
        $sort: { "mentor.rating.star": -1 },
      },
      {
        $project: {
          _id: 0,
          mentorId: "$mentor.userId",
          slots: 1,
        },
      },
    ]);
    return reviews;
  }

  async findByMentorAndDay(
    mentorId: string,
    startOfDay: Date,
    endOfDay: Date
  ): Promise<IGetBookedSlotsForStud[]> {
    const reviews = await reviewModel.aggregate([
      {
        $match: {
          mentorId: new mongoose.Types.ObjectId(mentorId),
          "slot.start": { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: "$mentorId",
          slots: {
            $push: {
              _id: "$_id",
              start: "$slot.start",
              end: "$slot.end",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          mentorId: { $toString: "$_id" },
          slots: 1,
        },
      },
    ]);

    return reviews;
  }

  async findReviewsForStudent(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ data: IPopulatedReviewEntity[]; totalDocuments: number }> {
    const studentIdObjectId = new mongoose.Types.ObjectId(filter.studentId);
    const mongoFilter: FilterQuery<IReviewEntity> = {
      studentId: studentIdObjectId,
    };

    if (filter.status) {
      mongoFilter.status = { $in: filter.status };
    }

    if (filter.dateRange) {
      mongoFilter["slot.start"] = {
        $gte: filter.dateRange.start,
        $lte: filter.dateRange.end,
      };
    }
    if (filter.pendingReviewState !== "undefined") {
      const currentDate = new Date();
      if (filter.pendingReviewState === PENDING_REVIEW_STATE.NOTOVER) {
        mongoFilter["slot.start"] = { $gt: currentDate };
      } else {
        mongoFilter["slot.end"] = { $lt: currentDate };
      }
    }

    const [data, totalDocuments] = await Promise.all([
      reviewModel.aggregate([
        { $match: mongoFilter },
        { $skip: skip },
        { $limit: limit },
        this._lookupForDomain,
        { $unwind: "$domain" },
        this._lookupForLevel,
        { $unwind: "$level" },
        this._lookupForMentor,
        { $unwind: "$mentor" },
        this._lookupForStudent,
        { $unwind: "$student" },
        {
          $project: {
            ...this._populatedProject,
            me: {
              _id: "$student._id",
              name: "$student.name",
              profileImage: "$student.profileImage",
            },
            otherAttendee: {
              _id: "$mentor._id",
              name: "$mentor.name",
              profileImage: "$mentor.profileImage",
            },
          },
        },
      ]),
      reviewModel.countDocuments(mongoFilter),
    ]);
    return { data, totalDocuments };
  }

  async findReviewForStudent(
    studentId: string,
    reviewId: string
  ): Promise<IPopulatedReviewEntity | null> {
    const studentObjectId = new mongoose.Types.ObjectId(studentId);
    const reviewObjectId = new mongoose.Types.ObjectId(reviewId);
    const reviews = await reviewModel.aggregate([
      {
        $match: { _id: reviewObjectId, studentId: studentObjectId },
      },
      {
        $limit: 1,
      },
      this._lookupForDomain,
      { $unwind: "$domain" },
      this._lookupForLevel,
      { $unwind: "$level" },
      this._lookupForMentor,
      { $unwind: "$mentor" },
      this._lookupForStudent,
      { $unwind: "$student" },
      {
        $project: {
          ...this._populatedProject,
          me: {
            _id: "$student._id",
            name: "$student.name",
            profileImage: "$student.profileImage",
          },
          otherAttendee: {
            _id: "$mentor._id",
            name: "$mentor.name",
            profileImage: "$mentor.profileImage",
          },
        },
      },
    ]);
    return reviews[0];
  }

  async findReviewsForMentor(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ data: IPopulatedReviewEntity[]; totalDocuments: number }> {
    const mentorObjectId = new mongoose.Types.ObjectId(filter.mentorId);
    const mongoFilter: FilterQuery<IReviewEntity> = {
      mentorId: mentorObjectId,
    };

    if (filter.status) {
      mongoFilter.status = { $in: filter.status };
    }

    if (filter.dateRange) {
      mongoFilter["slot.start"] = {
        $gte: filter.dateRange.start,
        $lte: filter.dateRange.end,
      };
    }
    if (filter.pendingReviewState !== "undefined") {
      const currentDate = new Date();
      if (filter.pendingReviewState === PENDING_REVIEW_STATE.NOTOVER) {
        mongoFilter["slot.end"] = { $gte: currentDate };
      } else {
        mongoFilter["slot.end"] = { $lte: currentDate };
      }
    }

    const [data, totalDocuments] = await Promise.all([
      reviewModel.aggregate([
        { $match: mongoFilter },
        { $skip: skip },
        { $limit: limit },
        this._lookupForDomain,
        { $unwind: "$domain" },
        this._lookupForLevel,
        { $unwind: "$level" },
        this._lookupForStudent,
        { $unwind: "$student" },
        this._lookupForMentor,
        { $unwind: "$mentor" },
        {
          $project: {
            ...this._populatedProject,
            me: {
              _id: "$mentor._id",
              name: "$mentor.name",
              profileImage: "$mentor.profileImage",
            },
            otherAttendee: {
              _id: "$student._id",
              name: "$student.name",
              profileImage: "$student.profileImage",
            },
          },
        },
      ]),
      reviewModel.countDocuments(mongoFilter),
    ]);
    return { data, totalDocuments };
  }

  async findReviewForMentor(
    mentorId: string,
    reviewId: string
  ): Promise<IPopulatedReviewEntity | null> {
    const mentorObjectId = new mongoose.Types.ObjectId(mentorId);
    const reviewObjectId = new mongoose.Types.ObjectId(reviewId);
    const reviews = await reviewModel.aggregate([
      {
        $match: { _id: reviewObjectId, mentorId: mentorObjectId },
      },
      {
        $limit: 1,
      },
      this._lookupForDomain,
      { $unwind: "$domain" },
      this._lookupForLevel,
      { $unwind: "$level" },
      this._lookupForStudent,
      { $unwind: "$student" },
      this._lookupForMentor,
      { $unwind: "$mentor" },
      {
        $project: {
          ...this._populatedProject,
          me: {
            _id: "$mentor._id",
            name: "$mentor.name",
            profileImage: "$mentor.profileImage",
          },
          otherAttendee: {
            _id: "$student._id",
            name: "$student.name",
            profileImage: "$student.profileImage",
          },
        },
      },
    ]);
    return reviews[0];
  }

  async createReview(reviewDetails: ICreateReview): Promise<IReviewModel> {
    const studentId = new mongoose.Types.ObjectId(reviewDetails.studentId);
    const mentorId = new mongoose.Types.ObjectId(reviewDetails.mentorId);
    const levelId = new mongoose.Types.ObjectId(reviewDetails.levelId);
    const domainId = new mongoose.Types.ObjectId(reviewDetails.domainId);
    const newReview = new reviewModel({
      ...reviewDetails,
      studentId,
      mentorId,
      levelId,
      domainId,
    });
    return newReview;
  }

  async saveReview(review: IReviewModel): Promise<void> {
    await review.save();
  }

  async checkIsBookedSlot(
    mentorId: string,
    start: Date,
    end: Date
  ): Promise<boolean> {
    const review = await reviewModel.findOne({
      mentorId,
      "slot.start": { $lt: end },
      "slot.end": { $gt: start },
    });
    return review ? true : false;
  }

  async updateReview(
    filter: Record<string, string>,
    update: Record<string, string>
  ): Promise<IReviewEntity | null> {
    let mongoFilter: FilterQuery<IReviewEntity> = {};
    const mongoUpdate: UpdateQuery<IReviewEntity> = {};
    const { reviewId, ...restFilter } = filter;
    mongoFilter = { _id: reviewId, ...restFilter };

    if (update.status) {
      mongoUpdate.status = update.status;
    }
    if (update.feedBack) {
      mongoUpdate.feedBack = update.feedBack;
    }
    if (update.paymentStatus) {
      mongoUpdate.payment.status = update.paymentStatus;
    }
    if (update.theory) {
      mongoUpdate.theory = update.theory;
    }
    if (update.practical) {
      mongoUpdate.practical = update.practical;
    }
    const updatedReview = await reviewModel
      .findOneAndUpdate(mongoFilter, mongoUpdate)
      .lean<IReviewEntity>();
    return updatedReview;
  }

  async updateReviewSlot(
    reviewId: string,
    slot: { start: Date; end: Date }
  ): Promise<void> {
    await reviewModel.updateOne(
      { _id: reviewId },
      { $set: { slot, status: "pending", isRescheduledOnce: true } }
    );
  }
}
