import {
  IGetStudentsForAdmin,
  IStudentEntity,
} from "entities/modelEntities/student-model.entity";
import { IStudentModel } from "frameworks/database/models/student.model";
import { ObjectId } from "mongoose";

import { IBaseRepository } from "./baseRepository.interface";
import { SORT_ORDER } from "shared/constants";

export interface IStudentRepository
  extends IBaseRepository<IStudentEntity, IStudentModel> {
  createStudent(userId: ObjectId): Promise<void>;

  findStudentsWithFilterAndPagination(
    filter: Record<string,string|boolean>,
    skip: number,
    limit: number,
    sort: { field: string; order: SORT_ORDER }
  ): Promise<{ data: IGetStudentsForAdmin[]; totalDocuments: number }>;

  updateStatus(userId: string, status: boolean): Promise<number>;

  getStatus(userId: string): Promise<IStudentEntity | null>;

  pushDomain(userId: string, domainId: string): Promise<void>;
}
