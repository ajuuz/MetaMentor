import { Exclude, Expose, Transform, Type } from "class-transformer";
import { GENDER } from "shared/constants";

export class MentorBaseDTO {
  @Expose()
  name!: string;

  @Expose()
  profileImage!: string;

  @Expose()
  country!: string;

  @Expose()
  @Type(() => DomainDTO)
  domains!: DomainDTO[];

  @Expose()
  skills!: string[];

  @Expose()
  workedAt!: string[];

  @Expose()
  fee!: number;
}

@Exclude()
export class DomainDTO {
  @Expose()
  @Transform(({ value }) => value.toString())
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  image!: string;
}

//admin
@Exclude()
export class GetMentorsForAdminResDTO extends MentorBaseDTO {
  @Transform(({ obj }) => obj.userId.toString())
  @Expose()
  userId!: string;

  @Expose()
  mobileNumber!: number | null;

  @Expose()
  rating!: number;

  @Expose()
  isBlocked!: boolean;
}

@Exclude()
export class GetMentorForAdminResDTO extends MentorBaseDTO {
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
}

//=------------user----------------//
@Exclude()
export class MentorPreviewDTO {
  @Expose()
  name!: string;
  @Expose()
  profileImage!: string;
}

@Exclude()
export class GetMentorsForStudResDTO extends MentorBaseDTO {
  @Transform(({ obj }) => obj.userId.toString())
  @Expose()
  userId!: string;

  @Expose()
  rating!: number;

  @Expose()
  about!: string;
}

//mentor application
export class GetMentorApplicationResDTO extends GetMentorForAdminResDTO {}

//---------------------mentor--------------------------//
@Exclude()
export class GetProfessionalDetailsResDTO {
  @Expose()
  about!: string;

  @Expose()
  @Type(() => DomainDTO)
  domains!: DomainDTO[];

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
}
