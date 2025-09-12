//admin

import { Exclude, Expose, Transform } from "class-transformer";

@Exclude()
export class GetStudentsForAdminResDTO {
  @Expose()
  @Transform(({ obj }) => obj.userId.toString())
  userId!: string;

  @Expose()
  seq!: number;

  @Expose()
  isBlocked!: false;

  @Expose()
  point!: number;
  
  @Expose()
  isPremium!: false;

  @Expose()
  name!: string;

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
