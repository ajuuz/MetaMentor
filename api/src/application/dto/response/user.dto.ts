import { Exclude, Expose, Transform } from "class-transformer"

@Exclude()
export class GetUserDetailsResDTO{
    @Expose()
    name!: string

    @Expose()
    profileImage!: string

    @Expose()
    country!: string|null

    @Expose()
    gender!: string|null

    @Expose()
    mobileNumber!: number|null

    @Expose()
    email!: string
}


@Exclude()
export class UserPreviewDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;
  @Expose()
  name!: string;
  @Expose()
  profileImage!: string;
}