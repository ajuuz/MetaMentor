import { Exclude, Expose, Transform, Type } from "class-transformer";
import { GENDER } from "shared/constants";

export class MentorBaseDTO {
  @Expose()
  name!: string;

  @Expose()
  country!: string;

  @Expose()
  skills!: string[];

  @Expose()
  workedAt!: string[];

  @Expose()
  fee!: number;
}

//admin
@Exclude()
export class GetMentorsForAdminResDTO extends MentorBaseDTO{
  @Transform(({ obj }) => obj.userId.toString())
  @Expose()
  userId!: string;

  @Expose()
  mobileNumber!: number | null;

  @Expose()
  domains!: string[];

  @Expose()
  isBlocked!: boolean;
}

@Exclude()
export class DomainDTO {
  @Expose()
  @Transform(({ value }) => value.toString())
  _id!: string;

  @Expose()
  name!: string;
}

@Exclude()
export class GetMentorForAdminResDTO extends MentorBaseDTO{
  @Expose()
  about!: string;

  @Expose()
  cv!: string;

  @Expose()
  experienceCirtificate!: string;

  @Expose()
  gender!: GENDER;

  @Expose()
  mobileNumber!: number;

  @Expose()
  email!: string;

  @Expose()
  profileImage!: string;

  @Expose()
  @Type(() => DomainDTO)
  domains!: DomainDTO[];
}

@Exclude()
export class MentorPreviewDTO {
  @Expose()
  name!: string;
  @Expose()
  profileImage!: string;
}
