//student
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
} from "class-validator";
import { FilterReqDTO } from "./pagination.dto";
import {
  DATE_RANGE,
  DAYS,
  PENDING_REVIEW_STATE,
  REVIEW_FILTER_STATUS,
  REVIEW_STATUS,
} from "shared/constants";

export class GetAllReviewsForStudReqDTO extends FilterReqDTO {
  @IsEnum(REVIEW_FILTER_STATUS)
  status!: REVIEW_FILTER_STATUS;

  @IsEnum(DATE_RANGE)
  dateRange!: DATE_RANGE;

  @ValidateIf((o) => o.status === REVIEW_FILTER_STATUS.PENDING)
  @IsEnum(PENDING_REVIEW_STATE)
  pendingReviewState?: PENDING_REVIEW_STATE | undefined;
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
  theory!:number

  @IsNumber()
  @Min(0)
  @Max(10)
  practical!:number
}
