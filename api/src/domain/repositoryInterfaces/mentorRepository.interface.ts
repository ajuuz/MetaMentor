import {
  IGetMentorApplicationDetails,
  IGetMentorProfessionalDetails,
  IGetMentors,
  IMentorEntity,
} from "domain/entities/mentor-model.entity";

import { IMentorModel } from "infrastructure/database/models/mentor.model";
import { SORT_ORDER } from "shared/constants";

import { IBaseRepository } from "./baseRepository.interface";

export interface IMentorRepository
  extends IBaseRepository<IMentorEntity, IMentorModel> {
  findById(userId: string): Promise<IGetMentorApplicationDetails | null>;
  findProfessionalDetails(
    mentorId: string
  ): Promise<IGetMentorProfessionalDetails | null>;

  register(
    userId: string,
    mentorDetails: Partial<IMentorEntity>
  ): Promise<void>;

  findMentorsWithFilterAndPagination(
    filters: {
      field: string;
      value: string | boolean;
      type: "direct" | "complex";
    }[],
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ items: IGetMentors[]; totalDocuments: number }>;

  getStatus(userId: string): Promise<IMentorEntity | null>;

  rateUser(mentorId: string, rating: number): Promise<void>
}
