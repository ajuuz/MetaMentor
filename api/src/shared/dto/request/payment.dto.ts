import { Type } from "class-transformer";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";

export class RazorPayCreateOrderReqDTO {
  @IsString()
  @IsNotEmpty()
  slotId!: string;

  @IsNumber()
  amount!: number;
}

class RazorpayDetails {
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

class SlotDetails {
  @Type(() => Date)
  @IsDate()
  isoStartTime!: Date;

  @Type(() => Date)
  @IsDate()
  isoEndTime!: Date;

  @IsString()
  @IsNotEmpty()
  day!: string;

  @IsNumber()
  start!: number;

  @IsNumber()
  end!: number;
}

export class ReviewDetails {
  @IsString()
  @IsNotEmpty()
  domainId!: string;

  @IsString()
  @IsNotEmpty()
  levelId!: string;

  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @IsNumber()
  amount!: number;

  @ValidateNested()
  @Type(() => SlotDetails)
  slot!: SlotDetails;
}

export class VerifyPaymentReqDTO {
  @ValidateNested()
  @Type(() => RazorpayDetails)
  razorPayDetails!: RazorpayDetails;

  @ValidateNested()
  @Type(() => ReviewDetails)
  reviewDetails!: ReviewDetails;
}
