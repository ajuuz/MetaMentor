import { Exclude, Expose, Transform, Type } from "class-transformer";
import { GENDER } from "shared/constants";

@Exclude()
export class GetMentorsForAdminResDTO {
  @Transform(({ obj }) => obj.userId.toString())
  @Expose()
  userId!: string;

  @Expose()
  name!: string;

  @Expose()
  country!: string;

  @Expose()
  mobileNumber!: number | null;

  @Expose()
  domains!: string[];

  @Expose()
  skills!: string[];

  @Expose()
  workedAt!: string[];

  @Expose()
  fee!: number;

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
export class GetMentorForAdminResDTO {
  @Expose()
  about!: string;

  @Expose()
  cv!: string;

  @Expose()
  experienceCirtificate!: string;

  @Expose()
  skills!: string[];

  @Expose()
  workedAt!: string[];

  @Expose()
  fee!: number;

  @Expose()
  name!: string;

  @Expose()
  country!: string;

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
