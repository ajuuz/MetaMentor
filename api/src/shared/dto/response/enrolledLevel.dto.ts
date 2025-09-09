import { Exclude, Expose } from "class-transformer";
import { LevelResDTO } from "./level.dto";

@Exclude()
export class EnrolledLevelResDTO extends LevelResDTO {
  @Expose()
  assignments!:string[]
}