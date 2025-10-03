//student
import { Type } from "class-transformer";
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateIf,
  ValidateNested,
} from "class-validator";
import {
  DATE_RANGE,
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
  REVIEW_STATUS,
  TIME_PERIOD,
  TIME_PERIOD_GROUP_BY,
} from "shared/constants";

import { FilterReqDTO } from "./pagination.dto";
import { ReviewSlotReqDTO } from "./payment.dto";

export class GetAllReviewsForStudReqDTO extends FilterReqDTO {
  @IsEnum(REVIEW_FILTER_STATUS)
  status!: REVIEW_FILTER_STATUS;

  @IsEnum(DATE_RANGE)
  dateRange!: DATE_RANGE;

  @ValidateIf((o) => o.status === REVIEW_FILTER_STATUS.PENDING)
  @IsEnum(PENDING_REVIEW_STATE)
  pendingReviewState?: PENDING_REVIEW_STATE | undefined;
}

export class GetReviewForStudReqDTO {
  @IsString()
  @IsNotEmpty()
  reviewId!: string;
}

export class GetReviewByDayForStudReqDTO {
  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @IsISO8601()
  date!: string;
}

export class CancelReviewByStudReqDTO {
  @IsString()
  @IsNotEmpty()
  reviewId!: string;
}

export class RescheduleReviewByStudReqDTO {
  @IsString()
  @IsNotEmpty()
  studentText!: string;

  @IsString()
  @IsNotEmpty()
  reviewId!: string;

  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @ValidateNested()
  @Type(() => ReviewSlotReqDTO)
  slot!: ReviewSlotReqDTO;
}

export class GetAllDomainReviewsForStudReqDTO {}

//mentors
export class GetReviewsForMentorReqDTO extends FilterReqDTO {
  @IsEnum(REVIEW_FILTER_STATUS)
  status!: REVIEW_FILTER_STATUS;

  @IsEnum(DATE_RANGE)
  dateRange!: DATE_RANGE;

  @ValidateIf((o) => o.status === REVIEW_FILTER_STATUS.PENDING)
  @IsEnum(PENDING_REVIEW_STATE)
  pendingReviewState?: PENDING_REVIEW_STATE | undefined;
}

export class GetReviewByDayForMentReqDTO {
  @IsISO8601()
  date!: string;
}

export class GetReviewForMentorReqDTO {
  @IsString()
  @IsNotEmpty()
  reviewId!: string;
}

export class CancelReviewByMentorReqDTO {
  @IsString()
  @IsNotEmpty()
  reviewId!: string;
}

export class SubmitReviewResultReqDTO {
  @IsString()
  @IsNotEmpty()
  reviewId!: string;

  @IsEnum([REVIEW_STATUS.PASS, REVIEW_STATUS.FAIL])
  status!: REVIEW_STATUS.PASS | REVIEW_STATUS.FAIL;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: "Feedback must be at least 10 characters long" })
  feedBack!: string;

  @IsNumber()
  @Min(0)
  @Max(10)
  theory!: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  practical!: number;
}

export class GetReviewGrowthReqDTO {
  @IsEnum(TIME_PERIOD)
  timePeriod!: TIME_PERIOD;
  
  @IsEnum(TIME_PERIOD_GROUP_BY)
  timePeriodGroupBy!: TIME_PERIOD_GROUP_BY;
}
