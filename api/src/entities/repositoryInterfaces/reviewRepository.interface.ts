import {
  IGetBookedSlotsForStud,
  IGetReviewForMent,
  IGetReviewsForStud,
  IGetReviewsForStudAndDomain,
  IReviewEntity,
} from "entities/modelEntities/reviewModel.entity";
import { IReviewModel } from "frameworks/database/models/bookedSlot.model";
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

  findReviewsForMentor(
    filter: any,
    skip: number,
    limit: number
  ): Promise<{ data: IGetReviewForMent[]; totalDocuments: number }>;

  findReviewForMentor(
    mentorId: string,
    reviewId: string
  ): Promise<IGetReviewForMent | null>;

  createReview(reviewDetails: Partial<IReviewEntity>): Promise<IReviewModel>;

  saveReview(review: IReviewModel): Promise<void>;

  checkIsBookedSlot(
    mentorId: string,
    day: string,
    start: number,
    end: number
  ): Promise<boolean>;

  updateReview(
    filter: Record<string, string>,
    update: Record<string, string>
  ): Promise<IReviewEntity | null>;
}
