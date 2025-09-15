import { Exclude, Expose, Transform, Type } from "class-transformer";
import { MentorBaseDTO } from "./mentor.dto";

@Exclude()
export class SlotTimeDTO {
  @Expose()
  @Transform(({obj})=>obj._id.toString())
  _id!: string;

  @Expose()
  start!: number;

  @Expose()
  end!: number;

  @Expose()
  enabled!: boolean;
}

//students
@Exclude()
export class WeekSlotDTO {
  @Expose()
  @Type(() => SlotTimeDTO)
  Monday!: SlotTimeDTO[];

  @Expose()
  @Type(() => SlotTimeDTO)
  Tuesday!: SlotTimeDTO[];

  @Expose()
  @Type(() => SlotTimeDTO)
  Wednesday!: SlotTimeDTO[];

  @Expose()
  @Type(() => SlotTimeDTO)
  Thursday!: SlotTimeDTO[];

  @Expose()
  @Type(() => SlotTimeDTO)
  Friday!: SlotTimeDTO[];

  @Expose()
  @Type(() => SlotTimeDTO)
  Saturday!: SlotTimeDTO[];

  @Expose()
  @Type(() => SlotTimeDTO)
  Sunday!: SlotTimeDTO[];
}

@Exclude()
export class GetSlotsForStudResDTO{
  
  @Expose()
  @Transform(({obj})=>obj.mentorId.toString())
  mentorId!:string

  @Expose()
  @Type(()=>WeekSlotDTO)
  weekSlots!:WeekSlotDTO

  @Expose()
  @Type(()=>MentorBaseDTO)
  mentor!:MentorBaseDTO
}