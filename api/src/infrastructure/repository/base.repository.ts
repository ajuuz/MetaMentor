import { IBaseRepository } from "domain/repositoryInterfaces/baseRepository.interface";

import {
  ClientSession,
  Document,
  FilterQuery,
  InsertManyOptions,
  Model,
  ProjectionType,
  QueryOptions,
  SortOrder,
  UpdateQuery,
} from "mongoose";
import { SORT_ORDER } from "shared/constants";

export class BaseRepository<T, D extends Document>
  implements IBaseRepository<T, D>
{
  constructor(protected model: Model<D>) {}

  async startSession(): Promise<ClientSession> {
    console.log(this.model.db);
    return this.model.db.startSession();
  }

  create(newDocument: Partial<T>): D {
    const document = new this.model(newDocument);
    return document;
  }

  async save(document: D, options?: QueryOptions): Promise<void> {
    await document.save(options);
  }

  async insertMany(
    documents: Omit<T, "_id">[],
    options?: InsertManyOptions
  ): Promise<void> {
    if (options) await this.model.insertMany(documents, options);
    else await this.model.insertMany(documents);
  }

  async insertOne(
    newDocument: Partial<Omit<T, "_id">>,
    options?: QueryOptions
  ): Promise<void> {
    await this.model.create(newDocument);
  }
  async updateOne(
    filters: { field: keyof T; value: string | boolean | number }[],
    updationFields: Partial<T>
  ): Promise<void> {
    const mongoFilter: Partial<Record<keyof T, string | boolean | number>> = {};
    for (const { field, value } of filters) {
      mongoFilter[field] = value;
    }
    await this.model.updateOne(
      mongoFilter as FilterQuery<D>,
      updationFields as UpdateQuery<D>
    );
  }

  async find(
    filter: Partial<T> = {},
    skip = 0,
    limit = 10,
    sort?: { field: string; order: SORT_ORDER }
  ) {
    const mongoFilter = filter as unknown as FilterQuery<D>;

    const sortOption = sort
      ? ({ [sort.field]: sort.order === "asc" ? 1 : -1 } as Record<
          string,
          SortOrder
        >)
      : {};

    const [items, totalDocuments] = await Promise.all([
      this.model
        .find(mongoFilter)
        .skip(skip)
        .sort(sortOption)
        .limit(limit)
        .lean() as Promise<T[]>,
      this.model.countDocuments(mongoFilter),
    ]);
    return { items, totalDocuments };
  }

  async findWhole(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>
  ): Promise<T[]> {
    return await this.model.find(filter, projection);
  }

  async findUsingIn(
    field: keyof T,
    items: any[],
    skip: number,
    limit: number
  ): Promise<{ documents: T[]; totalDocuments: number }> {
    const filter = { [field]: { $in: items } } as FilterQuery<T>;
    const [documents, totalDocuments] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).lean() as Promise<T[]>,
      this.model.countDocuments(filter),
    ]);

    return { documents, totalDocuments };
  }

  async findOne(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>
  ): Promise<T | null> {
    const data = await this.model.findOne(filter, projection).lean<T>();
    return data;
  }
}
