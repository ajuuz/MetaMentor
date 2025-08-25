import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  DAYS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  REVIEW_STATUS,
} from "shared/constants";
import { LevelPreviewDTO } from "./level.dto";
import { MentorPreviewDTO } from "./mentor.dto";
import { StudentPreviewDTO } from "./student.dto";

///-----Helper DTOS-----///
@Exclude()
export class ReviewPaymentDTO {
  @Expose()
  method!: PAYMENT_METHOD;
  @Expose()
  status!: PAYMENT_STATUS;
}

@Exclude()
export class ReviewSlotResDTO {
  @Expose()
  @Type(() => Date)
  isoStartTime!: Date;
  @Expose()
  @Type(() => Date)
  isoEndTime!: Date;
  @Expose()
  day!: DAYS;
  @Expose()
  start!: number;
  @Expose()
  end!: number;
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;
}

@Exclude()
export class ReviewBaseDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  @Type(() => LevelPreviewDTO)
  level!: LevelPreviewDTO;

  @Expose() 
  @Type(() => ReviewSlotResDTO)
  slot!: ReviewSlotResDTO;

  @Expose() 
  feedBack!: string;

  @Expose() 
  @Type(() => ReviewPaymentDTO)
  payment!: ReviewPaymentDTO;

  @Expose() 
  status!: REVIEW_STATUS;
}

//students
@Exclude()
export class GetReviewsForStudAndDomainResDTO extends ReviewBaseDTO{
  @Expose()
  mentorName!: string;

  @Expose()
  mentorEarning!: number;

  @Expose()
  commissionAmount!: number;
}

@Exclude()
export class GetReviewsForStudResDTO extends ReviewBaseDTO{
  @Expose()
  @Type(() => MentorPreviewDTO)
  mentor!: MentorPreviewDTO;

  @Expose()
  domainName!: string;
}

export class GetBookedReviewSlotsResDTO {
  @Expose()
  @Transform(({ obj }) => obj.mentorId.toString())
  mentorId!: string;

  @Expose()
  @Type(() => ReviewSlotResDTO)
  slots!: ReviewSlotResDTO;
}

//mentors

@Exclude()
export class GetReviewsForMentResDTO extends ReviewBaseDTO{
  @Expose()
  @Type(() => StudentPreviewDTO)
  student!: StudentPreviewDTO;

  @Expose()
  domainName!: string;
}

export class GetReviewForMentResDTO extends GetReviewsForMentResDTO{}
