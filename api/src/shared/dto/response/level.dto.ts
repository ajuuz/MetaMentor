import { Exclude, Expose, Transform } from "class-transformer";

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
}

//preview level dto
@Exclude()
export class LevelPreviewDTO {
  @Expose()
  name!: string;
  @Expose()
  taskFile!: string;
}
