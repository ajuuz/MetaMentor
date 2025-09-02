import {
  IGetMentorForAdmin,
  IGetMentors,
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
    filters: {field:string,value:string|boolean,type:'direct'|'complex'}[],
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ items: IGetMentors[]; totalDocuments: number }>;

  updateOne(
    filter: Partial<IMentorEntity>,
    update: Partial<IMentorEntity>
  ): Promise<void>;
  getStatus(userId: string): Promise<IMentorEntity | null>;
}
