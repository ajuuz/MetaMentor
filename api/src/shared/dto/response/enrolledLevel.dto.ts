import { Exclude, Expose, Transform } from "class-transformer";
import { LevelResDTO } from "./level.dto";

@Exclude()
export class EnrolledLevelResDTO extends LevelResDTO {
  @Expose()
  @Transform(({ obj }) => obj.levelId.toString())
  levelId!: string;

  @Expose()
  assignments!: string[];
}
