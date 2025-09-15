import {
  ICreateReview,
  IGetBookedSlotsForStud,
  IGetReviewForMent,
  IGetReviewsForStud,
  IGetReviewsForStudAndDomain,
  IReviewEntity,
} from "domain/entities/reviewModel.entity";
import { IReviewModel } from "infrastructure/database/models/bookedSlot.model";
import { BaseRepository } from "interfaceAdapters/repositories/base.repository";

export interface IReviewRepository
  extends BaseRepository<IReviewEntity, IReviewModel> {
  findByStudentAndDomain(
    studentId: string,
    domainId: string
  ): Promise<IGetReviewsForStudAndDomain[]>;

  getPassedReviewsCount(studentId: string, domainId: string): Promise<number>;

  findReviewsForStudent(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ data: IGetReviewsForStud[]; totalDocuments: number }>;

  findByDomain(domainId: string): Promise<IGetBookedSlotsForStud[]>;

  findByMentorAndDay(
    mentorId: string,
    startOfDay: Date,
    endOfDay: Date
  ): Promise<IGetBookedSlotsForStud[]>;

  findReviewsForMentor(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ data: IGetReviewForMent[]; totalDocuments: number }>;

  findReviewForMentor(
    mentorId: string,
    reviewId: string
  ): Promise<IGetReviewForMent | null>;

  createReview(reviewDetails: ICreateReview): Promise<IReviewModel>;

  saveReview(review: IReviewModel): Promise<void>;

  checkIsBookedSlot(mentorId: string, start: Date, end: Date): Promise<boolean>;

  updateReview(
    filter: Record<string, string>,
    update: Record<string, string | number>
  ): Promise<IReviewEntity | null>;

  updateReviewSlot(
    reviewId: string,
    slot: { start: Date; end: Date }
  ): Promise<void>;
}
