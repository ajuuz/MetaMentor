import { Transform, Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";

export class RazorPayCreateOrderReqDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsString({ each: true })
  slotId!: string[];

  @IsNumber()
  amount!: number;
}

class RazorPayVerifyDetailsReqDTO {
  @IsString()
  @IsNotEmpty()
  razorpay_order_id!: string;

  @IsString()
  @IsNotEmpty()
  razorpay_payment_id!: string;

  @IsString()
  @IsNotEmpty()
  razorpay_signature!: string;
}

class ReviewSlotReqDTO {
  @IsISO8601()
  start!: Date;

  @IsISO8601()
  end!: Date;
}

export class BookReviewReqDTO {
  @IsNumber()
  amount!: number;

  @IsString()
  @IsNotEmpty()
  domainId!: string;

  @IsString()
  @IsNotEmpty()
  levelId!: string;

  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @ValidateNested()
  @Type(()=>ReviewSlotReqDTO)
  slot!: ReviewSlotReqDTO;
}

export class VerifyPaymentReqDTO {
  @ValidateNested()
  @Type(() => RazorPayVerifyDetailsReqDTO)
  razorPayDetails!: RazorPayVerifyDetailsReqDTO;

  @ValidateNested()
  @Type(() => BookReviewReqDTO)
  reviewDetails!: BookReviewReqDTO;
}
