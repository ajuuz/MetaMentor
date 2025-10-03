import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  REVIEW_STATUS,
} from "shared/constants";

import { LevelPreviewDTO } from "./level.dto";
import { UserPreviewDTO } from "./user.dto";

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
  start!: Date;

  @Expose()
  end!: Date;

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
  status!: REVIEW_STATUS;

  @Expose()
  @Type(() => ReviewPaymentDTO)
  payment!: ReviewPaymentDTO;

  @Expose()
  feedBack!: string;

  @Expose()
  mentorEarning!: number;

  @Expose()
  commissionAmount!: number;

  @Expose()
  isRescheduledOnce!: boolean;

  @Expose()
  @Type(() => ReviewSlotResDTO)
  slot!: ReviewSlotResDTO;

  @Expose()
  theory!: number;

  @Expose()
  practical!: number;
}

//students
@Exclude()
export class GetReviewsForStudAndDomainResDTO extends ReviewBaseDTO {
  @Expose()
  mentorName!: string;
}

export class GetBookedReviewSlotsResDTO {
  @Expose()
  @Transform(({ obj }) => obj.mentorId.toString())
  mentorId!: string;

  @Expose()
  @Type(() => ReviewSlotResDTO)
  slots!: ReviewSlotResDTO;
}

@Exclude()
export class GetReviewsForStudResDTO extends ReviewBaseDTO {
  @Expose()
  @Type(() => UserPreviewDTO)
  me!: UserPreviewDTO;

  @Expose()
  @Type(() => UserPreviewDTO)
  otherAttendee!: UserPreviewDTO;

  @Expose()
  domainName!: string;
}
export class GetReviewForStudResDTO extends GetReviewsForStudResDTO {}

//mentors

@Exclude()
export class GetReviewsForMentResDTO extends GetReviewsForStudResDTO {}

export class GetReviewForMentResDTO extends GetReviewsForStudResDTO {}
