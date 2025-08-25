import { Exclude, Expose, Transform } from "class-transformer";

//admin
@Exclude()
export class GetDomainsForAdminResDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  image!: string;

  @Expose()
  description!: string;

  @Expose()
  motive!: string;

  @Expose()
  isBlocked!: boolean;
}

