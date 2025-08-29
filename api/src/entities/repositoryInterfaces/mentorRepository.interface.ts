import {
  IGetMentorForAdmin,
  IGetMentorsForAdmin,
  IMentorEntity,
} from "entities/modelEntities/mentor-model.entity";
import { SORT_ORDER } from "shared/constants";

export interface IMentorRepository {
  findById(userId: string): Promise<IGetMentorForAdmin | null>;
  register(
    userId: string,
    mentorDetails: Partial<IMentorEntity>
  ): Promise<void>;

  findMentorsWithFilterAndPagination(
    searchTerm:string,
    selectedDomains:string,
    filter: Partial<IMentorEntity>,
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ data: IGetMentorsForAdmin[]; totalDocuments: number }>;

  updateOne(
    filter: Partial<IMentorEntity>,
    update: Partial<IMentorEntity>
  ): Promise<void>;
  getStatus(userId: string): Promise<IMentorEntity | null>;
}
