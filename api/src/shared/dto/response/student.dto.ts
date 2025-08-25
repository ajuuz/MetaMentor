//admin

import { Exclude, Expose, Transform } from "class-transformer";

@Exclude()
export class GetStudentsForAdminResDTO {
  @Expose()
  @Transform(({ obj }) => obj.userId.toString())
  userId!: string;

  @Expose()
  isBlocked!: false;

  @Expose()
  point!: 0;

  @Expose()
  isPremium!: false;

  @Expose()
  name!: "AJMAL_EA";

  @Expose()
  country!: null;

  @Expose()
  mobileNumber!: null;
}

@Exclude()
export class StudentPreviewDTO {
  @Expose()
  name!: string;
  @Expose()
  profileImage!: string;
}
