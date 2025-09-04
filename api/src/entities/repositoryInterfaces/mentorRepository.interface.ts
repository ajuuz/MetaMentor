import {
  IGetMentorForAdmin,
  IGetMentors,
  IMentorEntity,
} from "entities/modelEntities/mentor-model.entity";
import { SORT_ORDER } from "shared/constants";
import { IBaseRepository } from "./baseRepository.interface";
import { IMentorModel } from "frameworks/database/models/mentor.model";

export interface IMentorRepository
  extends IBaseRepository<IMentorEntity, IMentorModel> {
  findById(userId: string): Promise<IGetMentorForAdmin | null>;
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
}
