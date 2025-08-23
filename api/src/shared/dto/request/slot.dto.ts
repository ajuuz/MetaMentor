import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { DAYS } from "shared/constants";

export class GetDomainSlotsForStudReqDTO {
  @IsString()
  @IsNotEmpty()
  domainId!: string;
}

export class SlotValidityCheckReqDTO {
  @IsString()
  @IsNotEmpty()
  mentorId!: string;

  @IsEnum(DAYS)
  day!: DAYS;

  @IsString()
  @IsNotEmpty()
  slotId!: string;
}
