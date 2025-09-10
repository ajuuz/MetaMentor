import { Exclude, Expose, Transform, Type } from "class-transformer";
import { LEVEL_TASK_TYPE } from "shared/constants";

@Exclude()
export class LevelResDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  taskFile!: string;

  @Expose()
  @Type(() => TaskResDTO)
  tasks!: TaskResDTO[];

  @Expose()
  isBlocked!:boolean
}

@Expose()
export class TaskResDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  type!: LEVEL_TASK_TYPE;

  @Expose()
  content!: string;
}



//preview level dto
@Exclude()
export class LevelPreviewDTO {
  @Expose()
  name!: string;
  @Expose()
  taskFile!: string;
}
